import {FC, useEffect, useState} from "react";
import {config, useTransition, a} from "react-spring";

export const JumpTexts: FC<{ source_array: number[] }> = ({source_array}) => {

    const [m_array, setM_array] = useState<number[]>([1]);

    useEffect(
        () => {
            let t = setInterval(() => {
                    setM_array(prev_array => {
                        if (Math.random() > 0.75) {
                            prev_array.push(Math.ceil(Math.random() * 10));
                        } else {
                            prev_array.splice(Math.ceil(Math.random() * prev_array.length), 1);
                        }
                        return [...prev_array];
                    })
                },
                500);
            return () => {
                clearInterval(t);
            };
        }, []);

    const transitions = useTransition(m_array, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
        delay: 200,
        config: config.slow,
    });

    return (
        <div style={{display: 'flex', width: '500px', overflow: 'auto'}}>
            {transitions(({opacity}, v) => (
                <a.p
                    style={{
                        opacity: opacity,
                        transform: opacity
                            .to(y => `translate3d(0,${y}px,0)`),
                    }}
                    key={v}>
                    {v}
                </a.p>
            ))}
        </div>
    );

}