import {FC} from "react";
import box_styles from "./QuizBox.module.scss";
import {FlipCarousel_Context} from "../Animations/FlipCarousel";

export const QuizBox: FC<{ Description: FC<any>, AnswerInput: FC<any>, Result: FC<any> }> =
    ({
         Description,
         AnswerInput,
         Result
     }) => {
        return (
            <div>
                <FlipCarousel_Context className={box_styles.QuizDisplay}>
                    <div className={box_styles.QuizArticle}>
                        <div className={box_styles.Description}>
                            <Description/>
                        </div>
                        <div className={box_styles.AnswerInput}>
                            <AnswerInput/>
                        </div>
                    </div>
                    <div className={box_styles.Result}>
                        <Result/>
                    </div>
                </FlipCarousel_Context>
            </div>);
    }