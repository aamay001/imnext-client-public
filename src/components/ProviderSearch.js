import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import '../styles/ProviderSearch.css';

export class ProviderSearch extends Component {
  // Add time delay for searching 300ms
  // Only search after 2-3 letters

  state = {
    value: '',
    providers: [],
    selectedProvider: ''
  }

  onSuggestionsFetchRequested = ({value}) => {
    const newProviders = [
      { id: '1', text: value + 1 },
      { id: '2', text: value + 2 },
      { id: '3', text: value + 3 }
    ];
    this.setState({
      providers: [...newProviders]
    });
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
    const inputValue = value.text.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : this.props.providers.filter(provider =>
      provider.text.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => {
    this.setState({
      selectedProvider: suggestion.id
    });
    return suggestion.text;
  }

  renderSuggestion = suggestion => (
    <div>
      {suggestion.text}
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
        onChange: this.onChange
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
  inputId : '1'
};

export default ProviderSearch;