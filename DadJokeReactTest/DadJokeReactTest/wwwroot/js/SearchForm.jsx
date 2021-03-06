﻿class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '', searchTermValidationVisible: 'False', results: null };
        this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSearchTermChange(e) {
        this.handleValidationSearchText(e.target.value);
        this.setState({ searchTerm: e.target.value });
    }

    handleSave(e) {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('post', this.props.saveUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => this.saveResult();
        xhr.send(this.state.results);
    }

    saveResult(e) {
        alert('Success');
    }

    handleSearch(e) {
        e.preventDefault();

        if (!this.handleValidationSearchText(this.state.searchTerm)) {
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.searchUrl + '?searchTerm=' + this.state.searchTerm, true);
        xhr.onload = () => {
            const results = JSON.parse(xhr.responseText);
            this.setState({ results: results });
        };
        xhr.send();
    }

    render() {
        return (
            <div>
                <form className="searchForm" onSubmit={this.handleSearch}>
                    <input type="text" placeholder="Search Term" value={this.state.searchTerm} onBlur={this.handleSearchTermChange} onChange={this.handleSearchTermChange} />
                    <InputTextValidation visible={this.state.searchTermValidationVisible} />
                    <input type="submit" value="Submit" />
                    <input type="button" value="Save" onClick={this.handleSave} />
                </form>

                <div>
                    <SearchResult data={this.state.results} />
                </div>
            </div>
        );
    }

    handleValidationSearchText(searchText) {
        if (searchText.length === 0) {
            this.setState({ searchTermValidationVisible: 'True' })
            return false;
        } else {
            this.setState({ searchTermValidationVisible: 'False' })
            return true;
        }
    }
}

class SearchResult extends React.Component {

    render() {
        var comments = [];

        if (this.props.data !== null) {

            var results = JSON.parse(this.props.data);

            for (var i = 0; i < results.Results.length; i++) {
                var result = results.Results[i];
                comments.push(<li>{result.Joke}</li>);
            }
        }

        return (<ul>{comments}</ul>);
    }
}

class InputTextValidation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.visible === "True") {
            return (<div>Please fill out the text box</div>);
        } else {
            return (<div></div>);
        }

    }
}