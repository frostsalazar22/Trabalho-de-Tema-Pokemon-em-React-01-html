const { auth, db } = require("../../frontend/config/firebase");

// Registrar Usuário
async function registerUser(req, res) {
  const { email, password, firstName, lastName } = req.body;
  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Salvando dados adicionais no Firestore
    await db.collection("Users").doc(userRecord.uid).set({
      email,
      firstName,
      lastName,
      photo: "",
    });

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Login de Usuário
async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await auth.getUserByEmail(email);
    if (user) {
      res.status(200).json({ message: "Usuário logado com sucesso!" });
    }
  } catch (error) {
    res.status(400).json({ error: "Email ou senha incorretos" });
  }
}

module.exports = { registerUser, loginUser };
