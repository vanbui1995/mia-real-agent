import React, { Component } from 'react';
import { shape } from 'prop-types';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';

import mentions from './mentions';

import './editorStyles.css';
import 'draft-js-mention-plugin/lib/plugin.css';

const Entry = (props) => {
  const {
    mention,
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <div className="mentionSuggestionsEntryContainer">
        <div className="mentionSuggestionsEntryContainerRight">
          <div className="mentionSuggestionsEntryText">
            {mention.name}
          </div>
          <div className="mentionSuggestionsEntryTitle">
            {mention.title}
          </div>
        </div>
      </div>
    </div>
  );
};

Entry.propTypes = {
  mention: shape().isRequired,
};


export default class RichEditor extends Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin({
      positionSuggestions: settings => ({
        left: `${settings.decoratorRect.left - 320}px`,
        top: `${settings.decoratorRect.top - 130}px`,
        display: 'block',
        transform: 'scale(1) translateY(-100%)',
        transformOrigin: '1em 0% 0px',
        transition: 'all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)',
      }),
    });
  }

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: mentions,
  };

  onChange = (editorState) => {
    const text = editorState.getCurrentContent().getPlainText();
    console.log({ text });
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    let suggestions = [...mentions];
    if (value) {
      const regex = new RegExp(value, 'i');
      suggestions = mentions.filter(({ name, title }) => regex.test(name) || regex.test(title));
    }
    this.setState({
      suggestions,
    });
  };

  onAddMention = () => {
    // get the mention object selected
  }

  focus = () => {
    this.editor.focus();
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div style={{ width: '100%' }} role="presentation" className="editor" onClick={this.focus}>
        <Editor
          placeholder="Your message ..."
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <MentionSuggestions
          handleReturn
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
          entryComponent={Entry}
        />
      </div>
    );
  }
}
