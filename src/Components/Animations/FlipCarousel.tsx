import React, {
    createContext,
    Dispatch, EventHandler,
    FC,
    MouseEventHandler,
    ReactNode,
    SetStateAction, useContext,
    useEffect,
    useState
} from "react";
import {config, useTransition, a, UseTransitionProps} from "react-spring";
import styles from "./FlipCarousel.module.scss";
import {FlipTexts} from "../TestsAndExamples/FlipExamples";
import {BehaviourContext, BehaviourMap, BasicBehaviourTypes} from "../../Structures/BehaviourContext";

export interface CommunicationProps {
    setPage_num?: React.Dispatch<React.SetStateAction<number>>
}

export interface RenderPagesProps extends CommunicationProps {
    cur_page_num: number
}

export const FlipCarousel_RenderProps:
    FC<{
        transition_props?: UseTransitionProps,
        Render_pages: FC<RenderPagesProps>,
        page_count: number,
    }> =
    ({
         transition_props = {
             from: {transform: "rotateY(-180deg) "},
             enter: {transform: "rotateY(0deg) "},
             leave: {transform: "rotateY(180deg) "},
             config: config.gentle,
         },
         Render_pages,
         page_count,
     }) => {
        const [page_num, setPage_num] = useState(0);
        const flip_transition = useTransition(page_num, transition_props);


        return (
            <div className={styles.PositionFlipDiv}>
                {
                    flip_transition((style, page_num) =>
                        (
                            <a.div style={{...style}}>
                                <Render_pages cur_page_num={Math.abs(page_num) % page_count} setPage_num={setPage_num}/>
                            </a.div>
                        ))
                }
            </div>);
    }


export interface CarouselBehaviourTypes extends BasicBehaviourTypes {
    CarouselTypes: "Next Page" | "Last page" | "Home";
}

export const next_page_behaviour: CarouselBehaviourTypes = {CarouselTypes: "Next Page"};
export const last_page_behaviour: CarouselBehaviourTypes = {CarouselTypes: "Last page"};
export const home_page_behaviour: CarouselBehaviourTypes = {CarouselTypes: "Home"};

export const FlipCarousel_Context:
    FC<{
        transition_props?: UseTransitionProps,
        children: ReactNode[],
        className?: string,
        elementClassName?: string,
    }> =
    ({
         transition_props = {
             from: {transform: "rotateY(-180deg) "},
             enter: {transform: "rotateY(0deg) "},
             leave: {transform: "rotateY(180deg) "},
             config: config.stiff,
         },
         children,
         className,
         elementClassName
     }) => {
        const page_count = children.length;
        const [page_index, setPage_index] = useState(0);
        const flip_transition = useTransition(page_index, transition_props);

        useEffect(() => {
            if (page_index < 0) setPage_index(page_count - 1);
            if (page_index > page_count - 1) setPage_index(0);
        }, [page_index]);

        let double_function={
            a_f:()=>void ,
            b_f:()=>void
        }



        let Behaviours: BehaviourMap<CarouselBehaviourTypes> = new Map([

            [next_page_behaviour,
                (e) => {
                    setPage_index((prev_i) =>
                        prev_i == page_count - 1 ? 0 : prev_i + 1);
                }
            ],

            [last_page_behaviour,
                (e) => {
                    setPage_index((prev_i) =>
                        prev_i == 0 ? page_count - 1 : prev_i - 1);
                }
            ],

            [home_page_behaviour,
                (e) => {
                    setPage_index(0);
                }
            ]
        ]);

        return (
            <BehaviourContext.Provider value={Behaviours}>
                <div className={[styles.PositionFlipDiv, className].join(" ")}>
                    {
                        flip_transition((style, page_num) =>
                            (
                                <a.div style={{...style}} className={elementClassName}>
                                    {children[page_num]}
                                </a.div>
                            ))
                    }
                </div>
            </BehaviourContext.Provider>);

    };


export const ExampleChildPage: FC<{ head: string }> = ({head}) => {

    const Behaviours = useContext(BehaviourContext) as BehaviourMap<CarouselBehaviourTypes>;

    const handleClickNext: MouseEventHandler = (e) => {
        Behaviours.get(last_page_behaviour)?.(e);
    };
    const handleClickLast: MouseEventHandler = (e) => {
        Behaviours.get(next_page_behaviour)?.(e);
    };

    return (
        <div>
            <h1>{head}</h1>
            <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean risus tellus, vehicula vel nisi in, elementum congue lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla ac feugiat massa. Aliquam erat volutpat. Pellentesque mollis, massa eget eleifend blandit, turpis augue molestie enim, a fermentum lectus leo at dui. Nullam id eros ligula. Morbi euismod, tellus quis vehicula accumsan, arcu justo suscipit massa, sed pretium sem leo et tortor."}</p>
            <div style={{display: 'grid'}}>
                <button onClick={handleClickLast}>{"< Last page"}</button>
                <button onClick={handleClickNext}>{"Next page >"}</button>
            </div>
        </div>);
};


