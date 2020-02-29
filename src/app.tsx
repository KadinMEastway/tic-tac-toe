import React from 'react';
import { Functions } from 'app/functions';
import { main } from 'app/app';
import './app.scss';

export type MessageSource = 'system' | 'user';

export interface Message {
	source: MessageSource;
	value: string;
}

export interface Props {}
export interface State {
	done: boolean;
	input: string;
	messages: Message[];
	theme: string;
}

export class App extends React.Component<Props, State> {
	protected _messages: Message[] = [];
	protected _messageInput: HTMLInputElement | null = null;
	protected _listener?: (message: string) => void;
	protected _themes = [ 'monokai', 'dark', 'light' ];

	constructor(props: Props) {
		super(props);
		this.state = {
			done: false,
			input: '',
			messages: [],
			theme: this._themes[0]
		};

		Functions.log = (...messages: any[]) => {
			this._messages = this._messages.concat({
				source: 'system',
				value: messages.join(' ')
			});
			this.setState({ messages: this._messages });
		};
		Functions.input = (...messages: any[]) => {
			if (messages.length) {
				Functions.log(...messages);
			}

			return new Promise(resolve => {
				this._listener = message => {
					resolve(message);
				};
			});
		};
	}

	componentDidMount(): void {
		const theme = window.localStorage.getItem('theme');
		if (theme) {
			this.setState({ theme });
		}

		main().then(() => {
			this.setState({ done: true });
		});

		if (this._messageInput) {
			this._messageInput.focus();
		}
	}

	render(): JSX.Element {
		const { done, input, messages, theme } = this.state;
		const inputChange = (input: string) => {
			this.setState({ input });
		};
		const inputKeyDown = (key: string) => {
			if (key === 'Enter' && typeof this._listener === 'function') {
				this._messages = this._messages.concat({
					source: 'user',
					value: input
				});
				this.setState({ input: '' });
				this._listener(input);
			}
		};
		const themeChange = (theme: string) => {
			window.localStorage.setItem('theme', theme);
			this.setState({ theme });
			if (this._messageInput) {
				this._messageInput.focus();
			}
		};

		return (
			<div className={`app ${theme}`}>
				<div className="theme-input">
					<label>Theme:</label>
					<select id="theme" value={theme} onChange={e => themeChange(e.target.value)}>
						{this._themes.map(theme =>
							<option key={theme} value={theme}>{theme}</option>
						)}
					</select>
				</div>
				<div className="content">
					<div className="messages">
						{messages.map((message, index) =>
							<div className={`message ${message.source}`} key={index}>{message.value}</div>
						)}
						{
							(!done)
							? <input
								className="message user"
								onChange={e => inputChange(e.target.value)}
								onKeyDown={e => inputKeyDown(e.key)}
								type="text"
								ref={(input) => { this._messageInput = input; }}
								value={input}
							/> : null
						}
					</div>
				</div>
			</div>
		);
	}
}
