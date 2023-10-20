import React from "react";
import tw from "twin.macro";

/* framer-motion and useInView here are used to animate the sections in when we reach them in the viewport
 */
import { motion as Motion } from "framer-motion";
import useInView from "./useInView";

const StyledDiv = tw.div`font-display min-h-screen text-secondary-500 p-8 overflow-hidden`;
function AnimationReveal({ disabled, children }: any) {
    if (disabled) {
        return <>{children}</>;
    }

    if (!Array.isArray(children)) children = [children];

    const directions = ["left", "right"];
    const childrenWithAnimation = children.map((child: any, i: any) => {
        return (
            <AnimatedSlideInComponent key={i} direction={directions[i % directions.length]}>
                {child}
            </AnimatedSlideInComponent>
        );
    });
    return <>{childrenWithAnimation}</>;
}

function AnimatedSlideInComponent({ direction = "left", offset = 30, children }: any) {
    const [ref, inView] = useInView({ margin: `-${offset}px 0px 0px 0px` });

    const x: any = { target: "0%" };

    if (direction === "left") x.initial = "-150%";
    else x.initial = "150%";

    return (
        <div ref={ref as any}>
            <Motion.section
                initial={{ x: x.initial }}
                animate={{
                    x: inView && x.target,
                    transitionEnd: {
                        x: inView && 0,
                    },
                }}
                transition={{ type: "spring", damping: 19 }}
            >
                {children}
            </Motion.section>
        </div>
    );
}

export default (props: any) => (
    <StyledDiv className="App">
        <AnimationReveal {...props} />
    </StyledDiv>
);
