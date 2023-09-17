import React from 'react';
import Chart from './Charts.js';
import Chart2 from './Charts2.js'
import Chart3 from './Charts3.js'

function UserProfile({ data }) {
  // get user name
  let dataUser = data[0].data.user[0]

  // get data about user skills
  let dataSkills = data[2].data.transaction
  const dataSkillsFiltered = dataSkills.filter((obj) => obj.type.includes("skill"))
  const dataSkillsObject = {};
  dataSkillsFiltered.forEach(item => {
    const { amount, type } = item;
    const cleanedType = type.replace(/^skill_/, '');
    if (!dataSkillsObject[cleanedType] || amount > dataSkillsObject[cleanedType].amount) {
      dataSkillsObject[cleanedType] = { amount, type: cleanedType };
    }
  });
  const dataSkillsArray = Object.values(dataSkillsObject);
  dataSkillsArray.sort((a, b) => b.amount - a.amount);

  // get data about user xp progress
  const dataXpProgression = dataSkills.filter((obj) => obj.type.includes("xp"))
  const dataXpFiltered = dataXpProgression.filter((obj) => !obj.path.includes("piscine"))
  dataXpFiltered.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA - dateB;
  });
  let accumulatedAmount = 0;
  const dataXpResult = dataXpFiltered.map((item) => {
    accumulatedAmount += item.amount;
    return {
      amount: Math.round(accumulatedAmount / 10000) / 100,
      createdAt: item.createdAt.split('T')[0]
    };
  });

  // get data about user audits
  let dataUpAudits = data[4].data.transaction
  const totalUpAmount = dataUpAudits.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0);
  let dataDownAudits = data[5].data.transaction
  const totalDownAmount = dataDownAudits.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0);
  let totalUp = Math.round(totalUpAmount / (totalUpAmount + totalDownAmount) *100)
  let totalDown = Math.round(totalDownAmount / (totalUpAmount + totalDownAmount) *100)
  const resultAudit = [
    {name: "Done audits", value: totalUp},
    {name: "Received audits", value: totalDown},
  ]

  // get data about user xp
  let dataXP = data[1].data.transaction
  const sum = dataXP.reduce((total, obj) => {
    if (!obj.path.includes("piscine")) {
      return total + obj.amount
    } else {
      return total
    }
  }, 0);
  let totalXP = Math.round(sum / 10000) / 100 + " MB"

  const handleLogout = () => {
    window.location.reload()
  };

  return (
    <div className='user-page'>
      <div id='logout' onClick={handleLogout} >Logout</div>
      <div className='user-page_container'>
        <h2>Welcome, {dataUser.attrs.firstName}!</h2>
        <h3>This is your user profile content.</h3>
        <div className='user-page_info'>
          <div>
            <p>{dataUser.attrs.firstName} {dataUser.attrs.lastName}</p>
            <p><strong>Gender:</strong> {dataUser.attrs.gender}</p>
            <p><strong>Country:</strong> {dataUser.attrs.country}</p>
            <p><strong>E-mail:</strong> {dataUser.attrs.email}</p>
            <p><strong>Tel:</strong> {dataUser.attrs.tel}</p>
          </div>
          <div>
            <div className='skills'>
              <strong>Your total XP:</strong> {totalXP}
            </div>

            <div className='skills'>
              <strong>Your skills:</strong> <ul className='skills_list'>
                {dataSkillsArray.map(({ type, amount }) => (
                  <li key={type}> {type} - {amount}%
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
            <div className='charts_container'>
              <Chart data={dataSkillsArray} />
              <Chart3 data={resultAudit} />
            </div>
              <Chart2 data={dataXpResult} />
      </div>
    </div>
  );
}

export default UserProfile;