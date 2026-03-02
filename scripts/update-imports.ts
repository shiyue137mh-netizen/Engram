
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

            // Refactoring Review System: Rename RevisionBridge modules
            if (moduleSpecifier.includes("RevisionBridge")) {
                const newSpecifier = moduleSpecifier.replace("RevisionBridge", "ReviewBridge");
                imp.setModuleSpecifier(newSpecifier);
                modified = true;
                continue;
            }

            // New Classification Rules for tavern base modules
            const baseMatches = [
                "@/integrations/tavern/api/WorldInfo", // old worldbook path
                "@/integrations/tavern/WorldBookSlot", // old worldbook path
                "@/integrations/tavern/WorldBookState", // old worldbook path
                "@/integrations/tavern/events", // old event path
                "@/integrations/tavern/context", // old context path
                "@/integrations/tavern/bridge", // old bridge path
                "@/integrations/tavern/chat", // old chat path
                "@/integrations/tavern/macros", // old macros path
                "@/integrations/tavern/ui" // old ui path
            ];

            if (baseMatches.some(match => moduleSpecifier.includes(match))) {
                // Determine destination
                if (moduleSpecifier.includes("WorldInfo") || moduleSpecifier.includes("WorldBook")) {
                    imp.setModuleSpecifier("@/integrations/tavern/worldbook");
                } else {
                    imp.setModuleSpecifier("@/integrations/tavern");
                }
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

                    const baseMatches = [
                        "@/integrations/tavern/api/WorldInfo",
                        "@/integrations/tavern/WorldBookSlot",
                        "@/integrations/tavern/WorldBookState",
                        "@/integrations/tavern/events",
                        "@/integrations/tavern/context",
                        "@/integrations/tavern/bridge",
                        "@/integrations/tavern/chat",
                        "@/integrations/tavern/macros",
                        "@/integrations/tavern/ui"
                    ];

                    if (baseMatches.some(match => text.includes(match))) {
                        // Replace path
                        if (text.includes("WorldInfo") || text.includes("WorldBook")) {
                            arg.setLiteralValue("@/integrations/tavern/worldbook");
                        } else {
                            arg.setLiteralValue("@/integrations/tavern");
                        }
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
