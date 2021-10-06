import app_style from './App.module.scss';
import {useSpring, a, config} from "react-spring";
import {useControls} from "leva";
import {FlipTexts} from "../Components/FlipExamples";
import flip_styles from "../Components/FlipExamples.module.scss";
import {JumpTexts} from "../Components/useTransitionExamples";

function App() {

    const {process} = useControls({
        process: {
            min: 0,
            max: 50,
            value: 5,
        }
    });

    const {transform, opacity} = useSpring({
        transform: `perspective(600px) rotateX(${90 * process / 4}deg) `,
        opacity: (1 + Math.sin(3.14 * process / 4)),
        config: config.gentle,
    });

    let style = {
        transform: transform,
        opacity: opacity
    };

    return (
        <div className={app_style.App}>
            <a.div className={app_style.AppElement} style={{...style}}>
                <h1>This is a React Animation Template</h1>
            </a.div>
            <div className={app_style.AppElement}>
                <FlipTexts div_class={flip_styles.PositionFlipDiv}/>
                <FlipTexts div_class={flip_styles.GridFlipDiv}/>
            </div>
            <div>
                <JumpTexts source_array={[]}/>
            </div>
        </div>
    );
}

export default App;
