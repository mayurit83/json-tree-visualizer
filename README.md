🧩 JSON Tree Visualizer

An interactive web app built with React Flow to visualize JSON data in a simple and clear tree structure.
You can paste any JSON, view it as a connected tree, search by path, and explore using zoom and pan options.
It also supports dark mode, reset, and download features for better usability.

🌐 Live Demo: [Add your deployed link here]

✨ Features
Main Features

📝 Paste or type JSON data directly into the text area

🚫 Validates JSON and shows error if input is invalid

🌳 Visualize JSON structure in a tree format using React Flow

🎨 Different colors for each type of node:

🔵 Objects: Blue or purple

🟢 Arrays: Green

🟠 Primitive values: Orange or yellow

🔍 Search by JSON path (like $.user.address.city or items[0].name)

🧭 Automatically highlights and centers the matched node

💬 Shows “Match found” or “No match found” message

Extra Features

🌗 Dark and Light mode toggle

♻️ Clear/Reset button to remove input or restore sample JSON

📋 Click any node to copy its JSON path

🖼 Download tree as an image

🔎 Zoom In / Zoom Out / Fit View controls

🖱 Drag canvas to move around large trees

💡 Hover a node to view its path and value

🧾 Includes sample JSON for quick testing

🚀 Getting Started
Requirements

Node.js (version 16 or newer)

npm or yarn

Steps to Run
# 1. Clone the repository
git clone <your-repo-url>
cd json-tree-visualizer

# 2. Install dependencies
npm install

# 3. Start the project
npm run dev


Then open your browser and go to 👉 http://localhost:5173

To Build for Deployment
npm run build


The final build will be available in the dist folder.

📖 How to Use

Add JSON
Paste your JSON or use the sample provided.
Click Generate Tree to visualize.

Explore the Tree
Each node represents a key or value from the JSON.
Use zoom or drag to explore.

Search by Path
Type a JSON path (like $.user.name) and press Enter.
The matched node will highlight automatically.

Interact with Nodes

Click to copy the node path

Hover to see details

Download the entire tree as an image

Theme Toggle
Switch between Dark 🌙 and Light ☀️ modes anytime.

🎨 Node Colors
Type	Color	Description
Object	🔵 Blue/Purple	JSON objects {}
Array	🟢 Green	JSON arrays []
Primitive	🟠 Orange/Yellow	Strings, numbers, booleans, null
🛠 Tech Stack

React 18 – Frontend framework

Vite – Build and development tool

React Flow – Used for creating the tree visualization

HTML-to-Image – Used for exporting as image

CSS / Tailwind – Styling and layout

📂 Folder Structure
json-tree-visualizer/
├── src/
│   ├── components/
│   │   ├── CustomNode.jsx       # Node component
│   │   └── CustomNode.css       # Node styling
│   ├── utils/
│   │   └── jsonToTree.js        # JSON parsing logic
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Styling
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Scripts and dependencies
├── vite.config.js               # Vite config
└── README.md                    # Documentation

🌐 Deployment
Vercel
npm run build
vercel --prod

Netlify
npm run build
# Upload the dist folder to Netlify

GitHub Pages

Update the base path in vite.config.js

Build and push:

npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages

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


Search examples:

$.user.name → John

$.user.address.city → New York

$.items[0].name → Laptop

$ → Root object

🤝 Contribution

Contributions and suggestions are always welcome!
You can open an issue or submit a pull request on GitHub.

📝 License

This project is open source and available under the MIT License.

🙏 Acknowledgments

React Flow

Vite

React

👩‍💻 Author

Mayuri Thorat
Built with ❤️ using React and React Flow.
