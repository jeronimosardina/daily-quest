import React from 'react';

const rewardsList = [
  { id: 1, name: 'Comida por delivery', cost: 1 },
  { id: 2, name: 'Comprar una remera', cost: 2 },
  { id: 3, name: 'Tarde libre', cost: 3 },
];

function Rewards({ skills, setSkills, showToast }) {
  const handleRedeem = (reward) => {
    if (skills >= reward.cost) {
      setSkills(skills - reward.cost);
      showToast(`🎉 Canjeaste: ${reward.name}`);
    } else {
      showToast('❌ No tenés suficientes skills');
    }
  };

  return (
    <div>
      <h2>Recompensas</h2>
      <p>Skills disponibles: {skills}</p>
      <ul>
        {rewardsList.map((reward) => (
          <li key={reward.id}>
            {reward.name} ({reward.cost} skills)
            <button onClick={() => handleRedeem(reward)}>Canjear</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rewards;
