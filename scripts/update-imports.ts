
import { Project, QuoteKind, ts } from "ts-morph";
import * as path from "path";

async function updateImports() {
    const project = new Project({
        tsConfigFilePath: path.resolve(process.cwd(), "tsconfig.json"),
    });

    const sourceFiles = project.getSourceFiles();
    console.log(`Found ${sourceFiles.length} source files.`);
    let updatedCount = 0;

    for (const sourceFile of sourceFiles) {
        let modified = false;

        // 1. Fix Static Imports
        const imports = sourceFile.getImportDeclarations();
        for (const imp of imports) {
            const moduleSpecifier = imp.getModuleSpecifierValue();
            if (moduleSpecifier.includes("workflow/processors/RegexProcessor") ||
                moduleSpecifier.includes("workflow/processors/TextProcessor")) {

                // Replace with unified steps import
                // We assume usage allows named import from steps/index.ts
                // If it was default import, we might need to change to named import?
                // steps/index.ts exports * (named exports).
                // regexProcessor is exported as named export.

                // Determine new specifier
                let newSpecifier = "@/modules/workflow/steps";

                // If using relative paths, we might want to keep relative?
                // Using alias is safer and cleaner.

                imp.setModuleSpecifier(newSpecifier);
                modified = true;
            }
        }

        // 2. Fix Dynamic Imports (CallExpressions)
        // Look for import('...')
        const callExpressions = sourceFile.getDescendantsOfKind(ts.SyntaxKind.CallExpression);
        for (const call of callExpressions) {
            if (call.getExpression().getText() === "import") {
                const args = call.getArguments();
                if (args.length > 0 && args[0].getKind() === ts.SyntaxKind.StringLiteral) {
                    const arg = args[0].asKindOrThrow(ts.SyntaxKind.StringLiteral);
                    const text = arg.getLiteralValue();

                    if (text.includes("workflow/processors/RegexProcessor") ||
                        text.includes("workflow/processors/TextProcessor")) {

                        // Replace path
                        arg.setLiteralValue("@/modules/workflow/steps");
                        modified = true;
                    }
                }
            }
        }

        // 3. Fallback: String Literals (for manual requires or other dynamic usages)
        // (Be careful not to replace random strings)

        if (modified) {
            await sourceFile.save();
            updatedCount++;
            console.log(`Updated imports in: ${sourceFile.getFilePath()}`);
        }
    }

    console.log(`\nFinished! Updated ${updatedCount} files.`);
}

updateImports().catch(console.error);
