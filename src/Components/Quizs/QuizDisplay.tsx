import {Children, FC, MouseEventHandler, ReactNode, useContext} from "react";
import display_styles from "./QuizDisplay.module.scss";
import {
    CarouselBehaviourTypes,
    FlipCarousel_Context,
    last_page_behaviour,
    next_page_behaviour
} from "../Animations/FlipCarousel";
import {BehaviourContext, BehaviourMap} from "../../Structures/BehaviourContext";

export const QuizDisplay: FC<{ Article: ReactNode, Solution: ReactNode }> = (
    {
        Article,
        Solution
    }) => {
    return (
        <div className={display_styles.QuizDisplay}>
            <FlipCarousel_Context>
                <div className={display_styles.Article}>
                    {Article}
                    <ExampleButton/>
                </div>
                <div className={display_styles.Solution}>
                    {Solution}
                    <ExampleButton/>
                </div>
            </FlipCarousel_Context>
        </div>);
};


export const ExampleButton: FC =
    () => {
        const Behaviours = useContext(BehaviourContext) as BehaviourMap<CarouselBehaviourTypes>;
        const handleClickNext: MouseEventHandler = (e) => {
            Behaviours.get(last_page_behaviour)?.(e);
        };
        const handleClickLast: MouseEventHandler = (e) => {
            Behaviours.get(next_page_behaviour)?.(e);
        };
        return (
            <div>
                <button onClick={handleClickLast}>
                    {"Button <"}
                </button>
                <button onClick={handleClickNext}>
                    {"Button >"}
                </button>
            </div>
        );
    }
