import React, {
    ComponentProps,
    createContext,
    Dispatch, EventHandler,
    FC, MouseEventHandler,
    ReactNode,
    SetStateAction, useContext, useEffect,
    useState
} from "react";
import {FlipCarousel_RenderProps, RenderPagesProps} from "../Animations/FlipCarousel";
import {a, config, useTransition, UseTransitionProps} from "react-spring";
import styles from "../Animations/FlipCarousel.module.scss";

export const TestDelayFunctionCallChildren: FC<{ Pages: FC<{ div_class: string }>, PagesProps: ComponentProps<FC<{ div_class: string }>> }> =
    ({Pages, PagesProps}) => {

        return (
            <div>
                <Pages {...PagesProps}/>
            </div>
        )
    };
