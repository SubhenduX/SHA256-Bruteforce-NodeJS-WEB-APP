
---

## **README.md**

# SHA-256 Brute Force Web App

A simple web application to perform a **brute-force attack** on SHA-256 hashes. This project is built using **Node.js**, **Express.js**, **WebSocket**, and **Bulma CSS** for styling.

## **Features**
- Start and stop brute-force attacks via a web interface.
- Display real-time status updates on every 1000 attempts using WebSocket.
- Save the match result in a `result.txt` file when a matching hash is found.
- Console area dynamically resizes to fit the screen based on the device viewport.

## **Tech Stack**
- **Backend**: Node.js, Express.js, WebSocket
- **Frontend**: HTML, Bulma CSS
- **Hashing Algorithm**: SHA-256 (via Node.js `crypto` module)

---

## **Screenshots**
![Screenshot](https://github.com/SubhenduX/SHA256-Bruteforce-NodeJS-WEB-APP/blob/main/public/image(1).png?raw=true)

---

## **Installation**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/sha256-bruteforce-webapp.git
   cd sha256-bruteforce-webapp
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   node index.js
   ```

4. **Access the App in Your Browser:**
   Open your browser and go to `http://localhost:3000`.



## **Usage**

1. **Start the Brute Force:**
   - Enter the target SHA-256 hash in the input field.
   - Click the **Start** button to begin the brute force process.

2. **Stop the Brute Force:**
   - Click the **Stop** button to stop the process at any time.

3. **Monitor Status:**
   - The status console updates every 1000 attempts, showing the attempt number, the current hash, and whether it matches the target hash.

4. **Result File:**
   - If a matching string is found, the result will be saved in `result.txt`.

---

## **Example Result Format in `result.txt`**
```
Match found! String: abcdefghijklmnopqrstuvwxyz0123456789abcdefghij
```

---

## **Project Structure**

```
/project-root
│
├── index.js             # Backend code (Node.js + Express)
├── /public              # Static files (HTML, CSS, JS)
│   └── index.html       # Frontend UI
└── result.txt           # Result saved when match is found
```

---

## **Credits**
Developed by [IndexedDev](https://indexeddev.com).

---

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



