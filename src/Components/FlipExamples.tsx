import React, {FC, useEffect, useState} from 'react';
import {useTransition, animated, config} from "react-spring";


export const FlipTexts: FC<{ div_class: string }> = ({div_class}) => {
    const articles = [
        'Hi there!',
        'I got something to say',
        'Good Night~',
    ]
    const [index, setIndex] = useState(0);
    const transition = useTransition(index, {
        from: {opacity: 0, transform: "rotateY(-180deg) "},
        enter: {opacity: 1, transform: "rotateY(0deg) "},
        leave: {opacity: 0, transform: "rotateY(180deg) "},
        config: {...config.gentle},
        delay: 1000,
        keys: index
    });

    useEffect(() => {
        const t = setInterval(
            () =>
                setIndex(prev_i =>
                    (prev_i + 1) % articles.length),
            3000)

        return () => clearTimeout(t)
    }, [])

    return (
        <div className={div_class}>
            {transition((anime_style, index, t, i) => (
                <animated.p
                    style={{...anime_style}}>
                    {articles[index]}
                </animated.p>))}
        </div>
    );
};

