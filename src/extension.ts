import * as vscode from 'vscode';
export function activate(context
: vscode.ExtensionContext) {
    const shortcuts: { [key: string]: string } = {
        "@sb" : "❙",
        "@bb" : "¦",

        "@to" : "→", /*⟶*/
        "@rightarrow": "→",
        "@mapsto" : "↦", /*⟼*/

        "@langle" : "〈",
        "@rangle" : "〉",

        "@leq" : "≤",
        "@geq" : "≥",
        "@wedge" : "∧",
        "@vee" : "∨",
        "@doublevee" : "⩔", /*⩖*/
        "@bigwedge" : "⋀",
        "@bigvee" : "⋁",
        
        /*
        "@Rightarrow" : "⟹",
        "@Leftarrow" : "⟸",
        "@Downarrow" : "⇓",
        "@Uparrow" : "⇑",
        */

        "@nleq" : "⪯",
        "@ngeq" : "⪰",
        "@nlt" : "≺",
        "@ngt" : "≻",
        "@nwedge" : "⋏",
        "@nvee" : "⋎",

        "@in" : "∈",
        "@subseteq" : "⊆",
        "@supseteq" : "⊇",
        "@subset" : "⊂",
        "@supset" : "⊃",
        "@cup" : "∩",
        "@cap" : "∪",
        "@bigcup" : "⋂",
        "@bigcap" : "⋃",

        "@sqin" : "⋿",
        "@sqsubseteq" : "⊑",
        "@sqsupseteq" : "⊒",
        "@sqsubset" : "⊏",
        "@sqsupset" : "⊐",
        "@sqcap" : "⊓",
        "@sqcup" : "⊔",
        "@bigsqcap" : "⨅",
        "@bigsqcup" : "⨆",

        "@lfloor" : "⌊",
        "@rfloor" : "⌋",
        "@lceil" : "⌈",
        "@rceil" : "⌉",


        "@Delta" : "∆",
        "@delta" : "δ",
        "@Nabla" : "∇",
        "@nabla" : "ƍ",
        "@sum" : "∑",
        "@int" : "∫",

        "@prod" : "∏",
        "@coprod" : "∐",

        "@alpha" : "α",
        "@beta" : "β",
        "@varbeta" : "ϐ",
        "@gamma" : "γ",
        /**/
        "@epsilon" : "ϵ",
        "@varepsilon" : "ε",
        "@zeta" : "ζ",
        "@eta" : "η",
        "@theta" : "θ",
        "@vartheta" : "ϑ",
        "@iota" : "ι",
        "@kappa" : "κ",
        "@varkappa" : "ϰ",
        "@lambda" : "λ",
        "@mu" : "μ",
        "@nu" : "ν",
        "@xi" : "ξ",
        "@omicron" : "ο",
        "@pi" : "π",
        "@varpi" : "ϖ",
        "@rho" : "ρ",
        "@varrho" : "ϱ",
        "@sigma" : "σ",
        "@varsigma" : "ς",
        "@tau" : "τ",
        "@upsilon" : "υ",
        "@varupsilon" : "ϒ",
        "@phi" : "ϕ",
        "@varphi" : "φ",
        "@chi" : "χ",
        "@psi" : "ψ",
        "@omega" : "ω",

        "@Alpha" : "Α",
        "@Beta" : "Β",
        "@Gamma" : "Γ",
        /**/
        "@Epsilon" : "Ε",
        "@Zeta" : "Ζ",
        "@Eta" : "Η",
        "@Theta" : "Θϴ",
        "@Iota" : "Ι",
        "@Kappa" : "Κ",
        "@Lambda" : "Λ",
        "@Mu" : "Μ",
        "@Nu" : "Ν",
        "@Xi" : "Ξ",
        "@Omicron" : "Ο",
        "@Pi" : "Π",
        "@Rho" : "Ρ",
        "@Sigma" : "Σ",
        "@Tau" : "Τ",
        "@Upsilon" : "Υ",
        "@Phi" : "Φ",
        "@Chi" : "Χ",
        "@Psi" : "Ψ",
        "@Omega" : "Ω",


        "@exists" : "∃",
        "@forall" : "∀",

        /* !¡ ?¿ ‽ ⸘ */
        /* ⁄ */

        /* ― <̱ */
    };

    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => {
            const document = event.document;
            const changes = event.contentChanges;

            for (const change of changes) {
                const text = change.text;

                // Procedi solo se l'input è "\n" o "("
                if (text === "@" || text === '\n' || text === " " || text === "_" || text === '(' || text === ')') {
                    const range = change.range;
                    const lineText = document.lineAt(range.start.line).text;
                    const endOfLine = range.start.character;

                    // Analizza il testo prima del trigger
                    const beforeText = lineText.slice(0, endOfLine);

                    for (const [shortcut, symbol] of Object.entries(shortcuts)) {
                        if (beforeText.endsWith(shortcut)) {
                            const start = endOfLine - shortcut.length;
                            const startPosition = new vscode.Position(range.start.line, start);
                            const endPosition = new vscode.Position(range.start.line, endOfLine);

                            // Sostituisci il shortcut con il simbolo corrispondente
                            const replaceRange = new vscode.Range(startPosition, endPosition);
                            const edit = new vscode.WorkspaceEdit();
                            edit.replace(document.uri, replaceRange, symbol);

                            vscode.workspace.applyEdit(edit);
                            break;
                        }
                    }
                }
            }
        })
    );
}

export function deactivate() {}