import React from "react";

class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "22",
            rideId: "323",
            rating: 5,
            description: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e =>
            this.setState({
                [field]: e.currentTarget.value
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        const review = Object.assign({}, this.state);
        this.props.postReview(review);
    }

    renderErrors() {
    
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>{error}</li>
                ))}
            </ul>
        );
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }
    componentDidMount() { }

    render() {
        return (
            <div className="signup-form-container">
                <form onSubmit={this.handleSubmit} className="signup-form-box">
                    <div className="SignInLinkButton">{this.renderErrors()}</div>
                    <label className="emailFieldContainer signupFC">
                        <input
                            type="text"
                            value={this.state.rating}
                            onChange={this.update("rating")}
                            className="signup-login"
                            placeholder="rating"
                        />
                    </label>
                    <label className="usernameFieldContainer signupFC">
                        <input
                            type="text"
                            value={this.state.rideId}
                            onChange={this.update("rideId")}
                            className="signup-login"
                            placeholder="rideId"
                        />
                    </label>
                    <label className="passwordFieldContainer signupFC">
                        <input
                            type="text"
                            value={this.state.description}
                            onChange={this.update("description")}
                            className="signup-login"
                            placeholder="description"
                        />
                    </label>
                    <label className="passwordFieldContainer signupFC">
                        <input
                            type="text"
                            value={this.state.userId}
                            onChange={this.update("userId")}
                            className="signup-login"
                            placeholder="userId"
                        />
                    </label>

                    <input className="session-submit" type="submit" value="Sign Up" />
                </form>
            </div>
        );
    }
}

export default ReviewForm;
