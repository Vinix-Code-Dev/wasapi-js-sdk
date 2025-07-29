type VarEntry = {
    text: string;
    val: string;
};

export function createVarList(...values: string[]): VarEntry[] {
    return values.map((val, i) => ({
        text: `{{${i + 1}}}`,
        val
    }));
}