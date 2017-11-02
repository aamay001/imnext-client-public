import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';
import {API} from '../config/settings.js';
import {providerSelectionMade} from '../actions/scheduler.actions';
import '../styles/ProviderSearch.css';

export class ProviderSearch extends Component {
  state = {
    value: '',
    providers: [],
    selectedProvider: ''
  }

  onSuggestionsFetchRequested = ({value}) => {
    if (value.length > 3 ){
      const init = {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      };
      const request = new Request(API.URL + API.PROVIDERS, init);
      fetch(request)
      .then( res => {
        if (!res.ok) {
          return res.json().then( _data =>
            Promise.reject({
              statusText: res.statusText,
              message: _data.message
            })
          );
        }
        return res.json();
      })
      .then(newProviders => {
        this.setState({
          providers: [...newProviders]
        });
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      providers: []
    })
  }

  onChange = (e, {newValue}) => {
    this.setState({
      value: newValue
    });
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength <= 3 ? [] : this.props.providers.filter(provider =>
      provider.providerName.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => {
    this.setState({
      selectedProvider: suggestion.providerId
    });
    this.props.dispatch(providerSelectionMade(suggestion.providerId));
    return suggestion.providerName;
  }

  renderSuggestion = suggestion => (
    <div>
      {suggestion.providerName}
    </div>
  );

  render() {
      const {value} = this.state;
      const inputProps = {
        type: "search",
        id: this.props.inputId,
        autoComplete: "off",
        value: value,
        required: true,
        onChange: this.onChange,
        placeholder:"type your providers name."
      };
      return (
        <Autosuggest
          suggestions={this.state.providers}
          inputProps={inputProps}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          renderSuggestion={this.renderSuggestion}
          getSuggestionValue={this.getSuggestionValue}
        />
      );
  }
}

ProviderSearch.defaultProps = {
  inputId : 'provider-search'
};

const mapStateToProps = state => ({
  providerSelectionMade: state.scheduler.providerSelectionMade
});

const ConnectedProviderSerach = connect(mapStateToProps)(ProviderSearch);
export default ConnectedProviderSerach;