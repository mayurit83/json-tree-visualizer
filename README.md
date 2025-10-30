🌳 JSON Tree Visualizer

An interactive web app that helps you visualize JSON data as a clean and colorful tree structure.
Built with React and React Flow, this tool makes it easy to explore, search, and understand any JSON file in a visual way.

✨ Features
✅ Core Features

JSON Input & Validation: Paste or type your JSON data and check if it’s valid.

Generate Tree: One click to create a complete visual tree structure.

Color-Coded Nodes:

🔵 Objects: Blue or purple shade

🟢 Arrays: Green shade

🟠 Primitives: Orange or yellow shade

Search by JSON Path: Example → $.user.address.city or items[0].name

Highlight & Pan: Automatically highlights and centers the matched node.

Search Result Message: Shows “Match found” or “No match found”.

💡 Extra Features (Bonus)

🌗 Dark / Light Mode: Switch theme easily.

🧹 Clear Button: Reset or clear JSON input quickly.

📋 Copy JSON Path: Click any node to copy its path.

📸 Download Tree: Save your visualization as an image (PNG).

🔍 Zoom & Pan Controls: Smoothly explore big JSON files.

🖱️ Hover Info: Shows node path and value when you hover.

🧾 Sample JSON: Preloaded example for quick demo.

🚀 Getting Started
Prerequisites

Make sure you have:

Node.js version 16 or higher

npm or yarn installed

Installation Steps
# 1. Clone the repository
git clone <your-repo-url>
cd json-tree-visualizer-main

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev


Open your browser and go to http://localhost:5173/

🧭 How to Use

Enter JSON:
Paste or type your JSON data in the left input box.
(You can also use the preloaded sample.)

Click “Generate Tree”:
The JSON structure will appear on the right side as a connected node tree.

Search by JSON Path:
Example →

$.user.name

$.user.address.city

$.items[0].name

The matched node will be highlighted and centered.

Interact with the Tree:

Click on any node to copy its path.

Hover to see its details.

Use zoom and pan for navigation.

Download your tree as an image.

Switch Theme:
Toggle between light and dark mode from the top-right button.

🎨 Node Colors
Type	Color	Description
Object	Blue / Purple	JSON objects {}
Array	Green	JSON arrays []
Primitive	Orange / Yellow	Strings, numbers, booleans, null
🛠️ Tech Stack

React 18 – UI framework

Vite – Fast build tool and dev server

React Flow – For node-based visualization

HTML-to-Image – To export visualization as image

CSS3 – Styling with gradients and animations

📂 Project Structure
json-tree-visualizer-main/
├── src/
│   ├── components/
│   │   ├── CustomNode.jsx       # Custom React Flow node
│   │   └── CustomNode.css       # Node styling
│   ├── utils/
│   │   └── jsonToTree.js        # JSON to tree conversion logic
│   ├── App.jsx                  # Main component
│   ├── App.css                  # Main styles
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── index.html                   # Root HTML file
├── package.json                 # Scripts and dependencies
├── package-lock.json
└── README.md                    # Documentation

📦 Build for Production
npm run build


All optimized files will be created inside the dist/ folder, ready for deployment.

🎯 Example JSON Paths
{
  "user": {
    "name": "John",
    "address": { "city": "New York" }
  },
  "items": [
    { "id": 1, "name": "Laptop" }
  ]
}


Search Examples:

$.user.name → “John”

$.user.address.city → “New York”

$.items[0].name → “Laptop”

🤝 Contributing

If you’d like to improve this project, feel free to fork the repo and create a pull request.

📝 License

This project is open-source under the MIT License.

💬 Contact

For any queries or suggestions, feel free to reach out.
Made with ❤️ using React and React Flow.
