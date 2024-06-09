declare module 'lzma/src/lzma_worker' {
    function compress(
        str: Buffer | string | Uint8Array,
        mode?: Mode,
    ): Uint8Array;

    function compress(
        str: Buffer | string | Uint8Array,
        mode: Mode,
        on_finish: (result: Uint8Array, error?: Error) => void,
        on_progress?: (percent: number) => void,
    ): void;

    function decompress(
        byte_array: Buffer | Uint8Array,
    ): Uint8Array | string;

    function decompress(
        byte_array: Buffer | Uint8Array,
        on_finish?: (result: Uint8Array | string, error?: Error) => void,
        on_progress?: (percent: number) => void,
    ): void;
}