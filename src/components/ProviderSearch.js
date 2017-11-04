import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { API } from '../config/settings.js';
import { providerSelectionMade } from '../actions/scheduler.actions';
import fetchHelper from '../helpers/fetch.helper';
import '../styles/ProviderSearch.css';

export class ProviderSearch extends Component {
  state = {
    value: '',
    providers: [],
    filteredProviders: [],
    selectedProvider: '',
  };

  componentDidMount() {
    fetchHelper('GET', API.PROVIDERS)
      .then(newProviders => {
        this.setState({
          providers: [...newProviders],
        });
      })
      .catch(error => {
        this.setState({
          providers: [],
        });
      });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength >= 3) {
      const provs = this.state.providers.filter( provider =>
        provider.providerName.toLowerCase().slice(0, inputLength) ===  inputValue);
      this.setState({
        filteredProviders: provs
      });
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      filteredProviders: [],
    });
  };

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  getSuggestionValue = suggestion => {
    this.setState({
      selectedProvider: suggestion.providerId,
    });
    this.props.dispatch(providerSelectionMade(suggestion.providerId));
    return suggestion.providerName;
  };

  renderSuggestion = suggestion => <div>{suggestion.providerName}</div>;

  render() {
    const { value } = this.state;
    const inputProps = {
      type: 'search',
      id: this.props.inputId,
      autoComplete: 'off',
      value: value,
      required: true,
      onChange: this.onChange,
      placeholder: 'type your providers name.',
    };
    return (
      <Autosuggest
        suggestions={this.state.filteredProviders}
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
  inputId: 'provider-search',
};

const mapStateToProps = state => ({
  providerSelectionMade: state.scheduler.providerSelectionMade,
});

const ConnectedProviderSerach = connect(mapStateToProps)(ProviderSearch);
export default ConnectedProviderSerach;
