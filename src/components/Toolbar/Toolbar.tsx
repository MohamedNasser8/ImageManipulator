import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useObserver } from "mobx-react";

import { ReactComponent as Close } from "../../assets/close.svg";
import useStore from "../../hooks/useStore";

import ToolbarCrop from "./ToolbarCrop";
import ToolbarRotate from "./ToolbarRotate";


const Toolbar: React.FC = () => {
  const { UIStore, canvasStore } = useStore();
  const contentMap: {[name: string]: JSX.Element} = {
    crop: <ToolbarCrop />,
    adjust: <ToolbarRotate />,

  };

  return useObserver(() => (
    <TransitionGroup component={null}>
      {UIStore.isToolbarOpen && (
        <CSSTransition
          timeout={600}
          classNames="toolbar"
        >
          <section className={`toolbar custom-scrollbar ${
            canvasStore.mode === "search" ? "toolbar_search" : ""
          }`}>
            <div className="toolbar__header">
              <h4 className="toolbar__title">{canvasStore.mode}</h4>
              <Close onClick={() => {
                canvasStore.resetToBaseScale();
                UIStore.closeToolbar();
              }}/>
            </div>
            {contentMap[canvasStore.mode]}
          </section>
        </CSSTransition>
      )}
    </TransitionGroup>
  ));
};

export default Toolbar;