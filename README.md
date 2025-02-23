# Azzamo Pubkey Converter

Azzamo Pubkey Converter is a web application that allows users to convert between Nostr npub addresses and hex public keys. It provides both single and bulk conversion capabilities, making it a versatile tool for Nostr users and developers.

## Features

- Convert single npub to hex public key and vice versa
- Bulk convert multiple npubs or hex public keys
- Clean, modern interface with dark mode
- Copy results to clipboard
- Error handling and validation
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/azzamo-pubkey-converter.git
   cd azzamo-pubkey-converter
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Single Conversion

1. Navigate to the home page.
2. Enter an npub address or hex public key in the input field.
3. Click "Convert" to see the result.
4. Use the "Copy" button to copy the result to your clipboard.

### Bulk Conversion

1. Click on the "Bulk Convert" button on the home page.
2. Enter multiple npub addresses or hex public keys, one per line.
3. Click "Convert" to see the results.
4. Each line in the output corresponds to the input in the same order.

### Switching Modes

- Use the "Switch to..." button at the bottom of each page to toggle between npub-to-hex and hex-to-npub conversion modes.

## Built With

- [Next.js](https://nextjs.org/) - The React framework for production
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [nostr-tools](https://github.com/nbd-wtf/nostr-tools) - Tools for working with Nostr protocol

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Nostr community for inspiration and support.
- Special thanks to the creators and maintainers of the libraries used in this project.

\`\`\`

