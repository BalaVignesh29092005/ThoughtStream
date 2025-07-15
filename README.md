🧠 Thought Stream
Thought Stream is a local blog website built using Node.js, Express, and EJS templating. It allows users to create, view, explore, and manage blogs — all running in-memory during a single session (no database required).

⚠️ This is a local, session-based app — all data will be lost when the server is restarted.

🌐 GitHub Repository: BalaVignesh29092005/ThoughtStream

🚀 Features
🏠 Home (/) — View featured blog previews.

✍️ Create Blog (/create) — Submit new blog posts.

📚 My Blogs (/myblog) — View your personal blogs with options to edit or delete.

🔍 Explore (/explore) — Discover random or topic-filtered blogs.

👁️ View Blog (/view) — Read full blog content from home or explore.

ℹ️ About (/about) — Info page about the platform.

🎯 Category Filter — Filter blogs by topics like Business, Technology, Sports, etc.

🛠️ Tech Stack
Backend: Node.js, Express.js

Templating: EJS

Styling: Custom CSS in /public

Utilities: body-parser, path, he for decoding HTML entities

📦 Getting Started
Clone the Repository
git clone https://github.com/BalaVignesh29092005/ThoughtStream.git
cd ThoughtStream

Install Dependencies
npm install

Start the Server
node app.js

Open in Browser
http://localhost:3000

🧪 Demo Blogs Included
Sample blogs on topics such as:

⚽ Sports

🌱 Environment

🧠 Psychology

🤖 Technology

🏢 Business

🎓 Education

🪄 Minimalism

❌ Limitations
No database — data is stored in-memory

No user login — all users share the same blog list per session

Session only — all content disappears on server restart

📃 License
MIT License © 2025 Bala Vignesh
