export enum PluginCommand {
  LocaleChanged = 'LocaleChanged',
  Login = 'Login',
  ThemeChanged = 'ThemeChanged',
  ConfigurationChanged = 'ConfigurationChanged',
  RenderChatConversation = 'RenderChatConversation',
  LikeMessage = 'LikeMessage',
  DislikeMessage = 'DislikeMessage',
  DeleteMessage = 'DeleteMessage',
  RegenerateMessage = 'RegenerateMessage',
  AppendToConversation = 'AppendToConversation',
  InterruptChatStream = 'InterruptChatStream',
  GotoSelectedCode = 'GotoSelectedCode',
  InsertCodeAtCaret = 'InsertCodeAtCaret',
  ReplaceSelectedCode = 'ReplaceSelectedCode',
  CreateNewFile = 'CreateNewFile',
  ClearChatHistory = 'ClearChatHistory',
  FixCode = 'FixCode',
  ExplainCode = 'ExplainCode',
  CommentCode = 'CommentCode',
  TestCode = 'TestCode',
  CopyCode = 'CopyCode',
  CheckCodePerformance = 'CheckCodePerformance',
  PresentCodeEmbeddedState = 'PresentCodeEmbeddedState',
  OpenFile = 'OpenFile',
  ReferenceCode = 'ReferenceCode',
}

export enum QuickCommand {
  Fix = '/fix',
  Clear = '/clear',
  Explain = '/explain',
  Comment = '/comment',
  Test = '/test',
  // Performance = '/performance',
}

export interface PluginMessage {
  command: PluginCommand;
  payload: any;
}

export interface CodeReference {
  languageId: string;
  fileUrl: string;
  fileName: string;
  sourceCode?: string;
  // document: string;
  selectedStartLine: number;
  selectedStartColumn: number;
  selectedEndLine: number;
  selectedEndColumn: number;
  visible: boolean;
}

export type ChatMessageAction = 'like' | 'dislike' | 'delete' | 'regenerate' | 'copy';

export interface ChatMessage {
  id: string;
  content: string;
  status: 'ok' | 'error';
  role: 'user' | 'assistant' | 'system' | 'divider';
  username: string;
  avatar: string;
  time: number;
  streaming: boolean;
  codeRef?: CodeReference;
  actions: Array<ChatMessageAction>;
}

export type PluginMessageCallback = (payload: any) => void;
export type PluginMessageHandler = (message: PluginMessage) => void;

export type PluginConfiguration = {
  locale: 'en' | 'cn';
  theme: 'light' | 'dark';
  username: string;
  loggedIn: boolean;
  repo: {
    name: string;
    embedding: boolean;
  };
  env?: 'test' | 'prd';
  /**
   * 插件版本号
   */
  version?: string;
  /**
   * 插件平台
   */
  platform?: string;
};

export type DevPilot = {
  type: 'vscode' | 'intellij' | 'mocked';
  config: PluginConfiguration;
  handlers: Array<PluginMessageHandler>;
  receiveFromPlugin: (command: PluginCommand, callback: PluginMessageCallback) => PluginMessageHandler;
  sendToPlugin: PluginMessageHandler;
  disposeHandler: (handler: PluginMessageHandler) => void;
};

declare global {
  interface Window {
    devpilot: DevPilot;
    intellijConfig?: PluginConfiguration;
    acquireVsCodeApi: () => any;
    receiveFromIntelliJ: PluginMessageHandler;
    sendToIntelliJ: (message: string) => void;
  }
}
