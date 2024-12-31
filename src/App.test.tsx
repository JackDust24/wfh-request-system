import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { BroadcastChannel } from 'worker_threads';

Reflect.set(globalThis, 'BroadcastChannel', BroadcastChannel);

jest.mock('./providers/UserAuthProvider', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useAuth: jest.fn(() => ({ user: null })),
}));

// // Define a mock BroadcastChannel
// class MockBroadcastChannel {
//   name: string;
//   listeners: Record<string, Array<(event: MessageEvent) => void>>;

//   constructor(name: string) {
//     this.name = name;
//     this.listeners = {};
//   }

//   postMessage(message: unknown) {
//     const event = new MessageEvent('message', { data: message });
//     this.listeners['message']?.forEach((callback) => callback(event));
//   }

//   addEventListener(eventType: string, callback: (event: MessageEvent) => void) {
//     if (!this.listeners[eventType]) {
//       this.listeners[eventType] = [];
//     }
//     this.listeners[eventType].push(callback);
//   }

//   removeEventListener(
//     eventType: string,
//     callback: (event: MessageEvent) => void
//   ) {
//     this.listeners[eventType] = this.listeners[eventType]?.filter(
//       (listener) => listener !== callback
//     );
//   }

//   close() {
//     this.listeners = {};
//   }
// }

// // This Overrides global.BroadcastChannel safely
// if (!global.BroadcastChannel) {
//   Object.defineProperty(global, 'BroadcastChannel', {
//     writable: true,
//     configurable: true,
//     value: MockBroadcastChannel,
//   });
// } else {
//   global.BroadcastChannel = MockBroadcastChannel;
// }

describe('App', () => {
  test('renders the App and shows the login screen', () => {
    render(<App />);

    expect(screen.getByText('Please Login to WFH Studio')).toBeInTheDocument();
  });
});
