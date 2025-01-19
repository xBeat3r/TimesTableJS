import { MapControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { MapControls as MapControlsImpl } from "three-stdlib";

const MyMapControls = () => {
    const mapControlsRef = useRef<MapControlsImpl>(null!);
    useEffect(() => {
        mapControlsRef.current.listenToKeyEvents(window as unknown as HTMLElement);
    }, []);

    return (
        <MapControls
            //
            ref={mapControlsRef}
            makeDefault
            zoomToCursor
            // FIXME: three-stdlib does not provide `maxTargetRadius` or other methods of constraining the target
            // onChange={(e) => {
            //     console.log(e);
            //     mapControlsRef.current.target.clampLength(0, 1);
            // }}
        />
    );
};

export default MyMapControls;
