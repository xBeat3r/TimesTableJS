import { ThreeElements } from "@react-three/fiber";

declare global {
    namespace React {
        namespace JSX {
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/consistent-type-definitions
            interface IntrinsicElements extends ThreeElements {}
        }
    }
}
