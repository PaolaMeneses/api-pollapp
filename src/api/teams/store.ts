import TeamModel from "./model";

export const getAllTeams = async () => {
  const team = await TeamModel.aggregate();
  console.log({ team });
  return team;
};

export const addTeam = async () => {
  const team = new TeamModel({
    name: "Grupo Familia",
    owner: "6333644586437f2045d9aee4",
    isActive: false,
    code: "AXc12112",
  });
  await team.save();
  console.log({ team });
  return team;
};

export const teamSeeder = async () => {
  const teams: { name: string; flag: string }[] = [
    {
      name: "Catar",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/qatar_XlO2YF5Ih.svg",
    },
    {
      name: "Ecuador",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/ecuador_JR5t9gL8s.svg",
    },
    {
      name: "Inglaterra",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/inglaterra_eQIOFEXkAI.svg",
    },
    {
      name: "Irán",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/iran_DEaxpMZXkH.svg",
    },
    {
      name: "Senegal",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/senegal_Yci0AqYbr.svg",
    },
    {
      name: "Paises Bajos",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/paises_bajos_XmMebZvOE.svg",
    },
    {
      name: "Estados unidos",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/estados_unidos_3rDw-mzkF.svg",
    },
    {
      name: "Gales",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/gales_IMPQynbPk.svg",
    },
    {
      name: "Argentina",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/argentina_ICX9ZbYtn.svg",
    },
    {
      name: "Arabia Saudita",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/arabia_saudita_Sd_SBtTsp.svg",
    },
    {
      name: "Dinamarca",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/dinamarca_QAFVqmgix.svg",
    },
    {
      name: "Túnez",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/tunez_SuhmOx1N2Q.svg",
    },
    {
      name: "México",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/mexico_3wfPJ77eK.svg",
    },
    {
      name: "Polonia",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/polonia_DV9ctuCd6.svg",
    },
    {
      name: "Francia",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/francia__neTMWAaF.svg",
    },
    {
      name: "Australia",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/australia_fooK8mwqCc.svg",
    },
    {
      name: "Marruecos",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/marruecos_z3oiq0ZzD.svg",
    },
    {
      name: "Croacia",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/croacia__lMQ9e87u.svg",
    },
    {
      name: "Alemania",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/alemania_XHI6XgwXP.svg",
    },
    {
      name: "Japón",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/japon_zOcIe3xbTf.svg",
    },
    {
      name: "España",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/espa%C3%B1a_HSgkNlWME.svg",
    },
    {
      name: "Costa Rica",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/costa_rica_q175FtRwF.svg",
    },
    {
      name: "Bélgica",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/belgica_wS_3m7mt9.svg",
    },
    {
      name: "Canadá",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/canada_uhTZvc01I.svg",
    },
    {
      name: "Suiza",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/suiza_YQUQ1Fil_A.svg",
    },
    {
      name: "Camerún",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/camerun_e0LfNCNYH1.svg",
    },
    {
      name: "Uruguay",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/uruguay_ONpvV9qc_.svg",
    },
    {
      name: "Corea del Sur",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/corea_sur_IEllwBzww.svg",
    },
    {
      name: "Portugal",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/portugal_LOjEx4oOB.svg",
    },
    {
      name: "Ghana",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/ghana_izZ4xYcTzM.svg",
    },
    {
      name: "Brasil",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/brasil__RerZKTV59.svg",
    },
    {
      name: "Serbia",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/serbia_iLjJTjiMLQ.svg",
    },
    {
      name: "Por definirse",
      flag: "https://ik.imagekit.io/apoyomibarrio/teams/vecteezy_mondial-fifa-world-cup-qatar-2022-official-logo-champion_8785666_pLGTuGxiC.jpg",
    },
  ];

  await Promise.all(
    teams.map((team) => {
      return new Promise<void>(async (resolve) => {
        const teamFound = await TeamModel.findOne({ name: team.name });

        if (!teamFound) {
          const newTeam = new TeamModel(team);
          await newTeam.save();
        }
        resolve();
      });
    })
  );
};
