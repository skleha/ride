import React from "react";


class aboutUsPage extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="AboutUsMain">
                <div className="AboutUsContent">
                    <h2 className="Contributors">Developers</h2>
                    <img className = "AboutUsPhoto" src="/aboutusphoto.png" />

                </div>
                <div className="MilesSong AboutIntro">
                    <h3 className="DevName">Miles Song</h3>
                    <a href="https://fspdumblr.herokuapp.com/" target="_blank" >
                    <img className="LinkIcon" src="/websiteicon.png" />
                    </a>
                    <a href="https://www.linkedin.com/in/miles-song/" target="_blank" >
                    <img className="LinkIcon" src= '/linkedinicon.png' />
                    </a>
                    <a href="https://github.com/msong793y" target="_blank" >
                    <img className="LinkIcon" src='/githubicon.png'  />
                    </a>
                </div>
                <div className="PaulRose AboutIntro">
                    <h3 className="DevName">Paul Rose</h3>
                    <a href="https://fspdumblr.herokuapp.com/" target="_blank" >
                        <img className="LinkIcon" src="/websiteicon.png" />
                    </a>
                    <a href="https://www.linkedin.com/in/paul-rose-72626952/" target="_blank" >
                        <img className="LinkIcon" src='/linkedinicon.png' />
                    </a>
                    <a href="https://github.com/rose-paul" target="_blank" >
                        <img className="LinkIcon" src='/githubicon.png' />
                    </a>
                </div>
                <div className="JessBon AboutIntro">
                    <h3 className="DevName">Jess Bon</h3>
                    <a href="https://fspdumblr.herokuapp.com/" target="_blank" >
                        <img className="LinkIcon" src="/websiteicon.png" />
                    </a>
                    <a href="https://www.linkedin.com/in/jess-bon-97368b197/" target="_blank" >
                        <img className="LinkIcon" src='/linkedinicon.png' />
                    </a>
                    <a href="https://github.com/jbonAA" target="_blank" >
                        <img className="LinkIcon" src='/githubicon.png' />
                    </a>
                </div>
                <div className="Steve AboutIntro">
                    <h3 className="DevName">Steve Kleha</h3>
                    <a href="https://fspdumblr.herokuapp.com/" target="_blank" >
                        <img className="LinkIcon" src="/websiteicon.png" />
                    </a>
                    <a href="https://www.linkedin.com/in/steve-kleha-751739198/" target="_blank" >
                        <img className="LinkIcon" src='/linkedinicon.png' />
                    </a>
                    <a href="https://github.com/skleha" target="_blank" >
                        <img className="LinkIcon" src='/githubicon.png' />
                    </a>
                </div>
            </div>
        );
    }
}

export default aboutUsPage;
