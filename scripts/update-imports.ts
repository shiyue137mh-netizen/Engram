
import * as path from "path";
import { Project, ts } from "ts-morph";

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

            // Refactoring WorldInfo: Map old paths to new module
            if (moduleSpecifier.includes("integrations/tavern/api/WorldInfo") ||
                moduleSpecifier.includes("integrations/tavern/WorldBookSlot") ||
                moduleSpecifier.includes("integrations/tavern/WorldBookState")) {

                // Replace with unified new module import
                imp.setModuleSpecifier("@/integrations/tavern/worldbook");
                modified = true;
            }

            // Refactoring Review System: Rename RevisionBridge modules
            if (moduleSpecifier.includes("RevisionBridge")) {
                const newSpecifier = moduleSpecifier.replace("RevisionBridge", "ReviewBridge");
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

                    if (text.includes("integrations/tavern/api/WorldInfo") ||
                        text.includes("integrations/tavern/WorldBookSlot") ||
                        text.includes("integrations/tavern/WorldBookState")) {

                        // Replace path
                        arg.setLiteralValue("@/integrations/tavern/worldbook");
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
