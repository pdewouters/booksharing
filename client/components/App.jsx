import React from 'react';
import Header from './Header';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function App(props) {
  return (
    <div>
      <Header />
      <div className="jumbotron">
        <h1>Share and manage your books</h1>
      </div>
			<ReactCSSTransitionGroup
				component="div"
				className="container"
				transitionName="appear"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}>
				{React.cloneElement(props.children, { key: props.location.pathname })}
			</ReactCSSTransitionGroup>
    </div>
  );
}

export default App;
