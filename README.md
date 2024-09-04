# ChainLearn: Personalized Blockchain-Powered Learning Management System (LMS)

Welcome to the repository for the **Personalized Blockchain-Powered Learning Management System (LMS)**! This project is built to revolutionize online education by combining the power of **Artificial Intelligence** (AI) and **Blockchain** technology to offer personalized, immersive, and incentivized learning experiences.

## 🚀 Project Overview

Our Learning Management System is designed to **adapt to each user** based on their background, goals, pace, and preferences. Unlike traditional platforms where users must follow a pre-designed path, our LMS dynamically generates customized learning paths and quizzes for each user. 

We use AI models from **Cohere** and integrate blockchain technology to reward students with **ERC20 tokens** for their learning progress and **NFT certificates** for course completion.

## 🛠️ Key Features

### 1. **AI-Powered Personalized Learning**
- Courses and quizzes are generated based on user data such as:
  - Background knowledge (e.g., beginner, intermediate, advanced)
  - Learning objectives and goals
  - Time availability for studying
  - Preferred pace of learning (fast, moderate, slow)
  - Language preference
- **AI Model**: We use Cohere's **command-nightly** and **embed-english-v3.0** models, with content based on the best-selling book *Mastering Blockchain* by Imran Bashir.
- **Quiz System**: AI not only generates quizzes but also provides intelligent feedback based on performance, helping users improve by targeting weak areas.

### 2. **Blockchain Integration**
- **Smart Contracts**:
  - Track course progress and mint **ERC20 tokens** for students who score over 50% on quizzes.
  - Upon completing the entire course, an **NFT certificate** is minted, representing a verifiable credential stored on the blockchain.
- **Tokenomics**:
  - Earn **ERC20 tokens** for each completed quiz, providing gamification and motivation.
  - Certificates are minted as NFTs and are stored in the student's blockchain wallet, offering decentralized, verifiable proof of completion.

### 3. **Modern Frontend with Next.js**
- **UI/UX**: A sleek, immersive interface built with **Next.js**, providing responsive and user-friendly experiences across devices.
- **Dashboards**: Personalized progress tracking and gamification with real-time updates.

### 4. **Business Model**
- **Freemium Model**: Users start with free credits, and additional credits can be purchased as they exhaust the free credits.
- **Incentivized Learning**: Earn credits for exceptional quiz performance or through blockchain-integrated rewards.

## 🌟 Future Plans
- **Enterprise Partnerships**: Collaborate with universities, blockchain companies, and educational institutions to offer certified courses.
- **Mobile Application**: Develop iOS and Android apps to expand reach and accessibility.
- **Peer-to-Peer Reviews**: Introduce community-driven course reviews and peer grading.
- **DAO Governance**: Future plans include a **DAO** to allow users to vote on platform upgrades, course additions, and tokenomics changes.
- **Cross-chain Compatibility**: Expand NFT and token minting to multiple blockchains (e.g., Ethereum, Polygon).

## 🏗️ Tech Stack

### Backend
- **Smart Contracts**: Solidity-based contracts for minting ERC20 tokens and NFT certificates.
- **Blockchain**: Ethereum for minting tokens and certificates.
  
### AI/ML
- **Cohere LLM**: For course and quiz generation using **command-nightly** and **embed-english-v3.0** models.
- **Content Knowledge Base**: Based on *Mastering Blockchain* by Imran Bashir.

### Frontend
- **Next.js**: For the LMS frontend, ensuring a responsive and engaging user interface.

## 💻 Getting Started

To set up the project locally, follow these steps:

### Prerequisites
- **Node.js** (v16.x or higher)
- **Ethereum Wallet** (e.g., MetaMask for testing)
- **Cohere API Key** (Sign up at [Cohere](https://cohere.com) for API access)
- **Hardhat** for blockchain contract deployment

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DonGuillotine/block-wise.git
   cd block-wise
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the Next.js frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Access the app**:  
   Open your browser and go to `http://localhost:3000`.

## 📧 Contact

If you have any questions or feedback, feel free to reach out via [email](mailto:infect3dlab@gmail.com) or create an issue in this repository.

## 📧 Credits


If you have any questions or feedback, feel free to reach out via [email](mailto:infect3dlab@gmail.com) or create an issue in this repository.
---

Happy Learning!  
