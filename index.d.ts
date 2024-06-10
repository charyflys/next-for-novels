

declare module 'lzma/src/lzma_worker' {
    export const LZMA: {
        compress(
            str: Buffer | string | Uint8Array,
            mode?: Mode,
        ): Uint8Array,
    
        compress(
            str: Buffer | string | Uint8Array,
            mode: Mode,
            on_finish: (result: Array, error?: Error) => void,
            on_progress?: (percent: number) => void,
        ): void,
    
        decompress(
            byte_array: Buffer | Uint8Array,
        ): Uint8Array | string;
    
        decompress(
            byte_array: Buffer | Uint8Array,
            on_finish?: (result: Uint8Array | string, error?: Error) => void,
            on_progress?: (percent: number) => void,
        ): void;
    }
}

