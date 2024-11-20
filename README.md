# React + Vite Project Installation

## Installation Steps
![image](https://github.com/user-attachments/assets/c1221125-af31-4037-a4aa-98d24c2bfa97)

### Install Dependencies
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

## Environment Setup

### .env Configuration
Create a `.env` file in your project root with the following variable:

```env
VITE_GEKO_API_KEY=your_api_key
```

## Notable Decisions

### Dashboard Configuration Export
- While a full dashboard configuration export was not implemented, the project includes a solution to Export Context data (Pinned Coins list) as JSON.

- I was not able to utilise React-DND as well, instead used react-useContext hook.

- Layout should automatically adjust when a component is deleted, avoiding gaps and maintaining the grid structure couldnt be implemented.
