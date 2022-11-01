import React from 'react';

import "./App.css";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Contact from "./components/contact/Contact";
import Experience from "./components/experience/Experience";
// import Experience from "./components/experience/Experience";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Portfolio from "./components/portfolio/Portfolio";
import Services from "./components/services/Services";
import Testimonials from "./components/testimonials/Testimonials";
import { AiFillBehanceCircle, AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown, IoIosAnalytics, IoIosApps, IoIosArrowBack, IoIosSearch, IoIosArrowForward } from "react-icons/io";
import * as IO5Icon from "react-icons/io5";
import User from "./assets/4.jpg"
const App = () => {

  const [stateOperateurs, setStateOperateurs] = React.useState([
    // { name: "jean", dispoForTestEvaluate: 3, programs: [] },
    // { name: "bertrand", dispoForTestEvaluate: 2, programs: [] },
    // { name: "Damien", dispoForTestEvaluate: 7, programs: [] },
    // { name: "Comlan", dispoForTestEvaluate: 4, programs: [] },
    // { name: "Koffi", dispoForTestEvaluate: 4, programs: [] },
    // { name: "Chauffeur", dispoForTestEvaluate: 4, programs: [] },
    // { name: "Dog", dispoForTestEvaluate: 4, programs: [] },
    // { name: "Dacos", dispoForTestEvaluate: 4, programs: [] },
  ])
  const [stateOperations, setStateOperations] = React.useState([])
  const [stateRefOperations, setRefStateOperations] = React.useState([])
  const [listTabs, setListTabs] = React.useState([
    {
      id: 1,
      name: "By Status"
    },
    {
      id: 2,
      name: "By Assignee"
    },
    {
      id: 2,
      name: "My Tasks"
    },
    {
      id: 2,
      name: "Due Tasks"
    }
  ])
  const [selectedTab, setSelectedTab] = React.useState(listTabs[0].name)
  const [stateOperatorsSentByUsers, setStateOperatorsSentByUsers] = React.useState([])
  const [stateOperationsSentByUsers, setStateOperationsSentByUsers] = React.useState([])
  const [days, setDays] = React.useState(0)
  const [inputOperator, setInputOperator] = React.useState("")
  const [currrentEditOPtion, setCurrentOption] = React.useState(0)
  const [currrentEditOPtor, setCurrentOptor] = React.useState(0)
  const [inputOperations, setInputOperations] = React.useState("")
  const [inputOperatorDispo, setInputOperatorDispo] = React.useState(0)
  const [inputOperationsCandidate, setInputOperationsCandidate] = React.useState(0)
  const [showModalAddOperator, setShowModalAddOperator] = React.useState(false)
  const [themeActive, setThemeActive] = React.useState("light")
  const [showSearchF, setShowSearchF] = React.useState(false)
  const [showModalAddOperations, setShowModalAddOperations] = React.useState(false)
  const [stateProgramsDays, setStateProgramsDays] = React.useState([])
  const [stateRetreatingProgramsDays, setStateRetreatingProgramsDays] = React.useState([])

  const customIA = React.useCallback(() => {
    if (stateOperations.length > 0) {
      // let operations = [...stateOperations]
      let operations = stateOperations.map(a => { return { ...a } })
      // array2.find(a => a.id == 2).name = "Not Two";
      let operateurs = stateOperateurs.map(a => { return { ...a } })
      // let operateurs = stateOperateurs.map(a => { return { ...a } })
      // console.log("opear", stateOperations)
      let programsDays = stateProgramsDays.map(a => { return { ...a } })
      let totalEntriesOperationsByOperatorsDispo = 0
      let totalEntriesOperations = 0
      for (var i = 0; i < operateurs.length; i++) {
        totalEntriesOperationsByOperatorsDispo += operateurs[i].dispoForTestEvaluate
      }
      for (var i = 0; i < operations.length; i++) {
        totalEntriesOperations += operations[i].testEvaluate
      }

      // console.log("ope", operations === stateOperations)
      let breakOnDayFinished = false
      let iterateOnclassed = 0
      for (let operation in operations) {
        let opName = operations[operation]?.candidate

        while ((operations[operation]?.testEvaluate > 0)
          && (breakOnDayFinished === false)) {
          for (let operateur in operateurs) {
            // Si l'operateur est dispo il prend un job
            if ((operateurs[operateur]?.programs.length <
              operateurs[operateur]?.dispoForTestEvaluate)) {
              let iot = operateurs.find(a => a === operateurs[operateur]).programs
              // operateurs[operateur]?.programs.push(opName)
              operateurs.find(a => a === operateurs[operateur]).programs = [...iot, opName];
              iterateOnclassed += 1;
              break
            }
          }
          if (iterateOnclassed ===
            totalEntriesOperationsByOperatorsDispo) {
            // Si on atteint le nombre limite de programme par jour on envoie les données générées et on arrete
            let sendPrograms = {
              "days": days,
              "programsGenerated": operateurs
            }
            programsDays.push(sendPrograms)
            setStateProgramsDays(programsDays)
            breakOnDayFinished = true
          }
          // operations[operation].testEvaluate -= 1;
          operations.find(a => a === operations[operation]).testEvaluate -= 1;
        }
        if (iterateOnclassed ===
          totalEntriesOperationsByOperatorsDispo) {
          operations = operations.filter((a) => a.testEvaluate > 0)
          setStateOperations(operations.filter((a) => a.testEvaluate > 0))
          setDays(days + 1)
          let reUpDataOp = operateurs.map(operateur => {
            return {
              name: operateur.name,
              dispoForTestEvaluate: operateur.dispoForTestEvaluate,
              programs: [],
            }
          })
          setStateOperateurs(reUpDataOp)
          break
        }

        else if (iterateOnclassed === totalEntriesOperations) {
          operations = operations.filter((a) => a.testEvaluate > 0)
          let sendPrograms = {
            "days": days,
            "programsGenerated": operateurs
          }
          programsDays.push(sendPrograms)
          setStateProgramsDays(programsDays)
        }
      }

    }
  }, [stateOperations])

  const customIAProgramsGens = React.useCallback(() => {
    if (stateProgramsDays.length > 0) {
      let reformatedData = stateProgramsDays.map(e => {
        // console.log(e.days)
        let derby = e?.programsGenerated.map(p => {
          let send = [];
          for (var i in p?.programs) {
            send.push({
              name: p.name,
              evaluate: p?.programs[i]
            })
          }
          // console.log("send", send)
          return send;
          // let t = p?.programs.map(d => { name: p?.name })
        })
        return {
          day: e.days,
          programsGen: derby?.flat().map(p => {
            return {
              day: e.days,
              name: p.name,
              evaluate: p.evaluate,
            }
          })
        }
      })
      setStateRetreatingProgramsDays(reformatedData)
    }
  }, [stateOperations, stateProgramsDays])

  React.useEffect(() => {
    // if ((stateOperations.length > 0) && (stateOperations.length < 2)) {
    //   let iso = [...stateOperations]
    //   iso.push({
    //     id: 201,
    //     candidate: "Jean",
    //     testEvaluate: parseInt("10"),
    //   })

    //   setStateOperations(iso)

    //   // setStateOperations([...stateOperations, {
    //   //   id: 201,
    //   //   candidate: "Jean",
    //   //   testEvaluate: parseInt("10"),
    //   // }])
    // }
    console.log("stateOperations", stateOperations)
    // console.log("stateOperations", st)
  }, [stateOperations])


  React.useEffect(() => {

    console.log("stateOperateurs", stateOperateurs)
  }, [stateOperateurs])

  // React.useEffect(() => {
  //   let sendOperations = [
  //     { candidate: "Nettoyer", testEvaluate: 2 },
  //     { candidate: "Balayer", testEvaluate: 2 },
  //     { candidate: "Planter", testEvaluate: 3 },
  //     { candidate: "Charger", testEvaluate: 3 },
  //     { candidate: "Melanger", testEvaluate: 3 },
  //     { candidate: "Quêter", testEvaluate: 3 },
  //     { candidate: "Trafiquer", testEvaluate: 15 },
  //   ]

  //   // setStateOperations(sendOperations)
  //   // setRefStateOperations(sendOperations)
  // }, [])

  React.useEffect(() => {
    customIA()
  }, [customIA])

  React.useEffect(() => {
    customIAProgramsGens()
  }, [customIAProgramsGens])

  React.useEffect(() => {
    console.log("stateProgramsDays", stateProgramsDays)
    console.log("stateRetreatingProgramsDays", stateRetreatingProgramsDays)
  }, [stateRetreatingProgramsDays])

  // React.useEffect(() => {
  //   console.log("stateProgramsDays", stateProgramsDays)
  // }, [stateProgramsDays])

  const handleChangeInputOperator = event => {
    setInputOperator(event.target.value);
  };

  const handleChangeInputOperatorDispo = event => {
    setInputOperatorDispo(event.target.value);
  };

  const handleChangeInputOperations = event => {
    setInputOperations(event.target.value);
  };

  const handleChangeInputOperationsCandidate = event => {
    setInputOperationsCandidate(event.target.value);
  };

  return (
    <div className="parent-Home">
      {
        showModalAddOperator && <div
          // onClick={() => setShowModalAddOperator(false)}
          className={"add-operators-modals"}>
          <div
            className="add-operators-modals-container">
            <h3>Ajouter un opérateur</h3>
            <div className='brs' />
            <div className="rows-inputs">
              <div className="input-add">
                <p>Nom de l'opérateur</p>
                <input
                  type="text"
                  name="add-op"
                  value={inputOperator}
                  onChange={handleChangeInputOperator}
                  id=""
                  className="add-operator-inp"
                  placeholder="Ajouter un opérateur"
                />
              </div>

              <div className="input-add">
                <p>Nbre d'évaluation /jrs</p>
                <input
                  type="number"
                  name="add-op"
                  value={inputOperatorDispo}
                  onChange={handleChangeInputOperatorDispo}
                  id=""
                  className="add-operator-inp"
                />
              </div>
            </div>
            <div className="rows-inputs" style={{ marginTop: 15 }}>
              <div
                onClick={() => {

                  // setStateOperatorsSentByUsers(gettedOpetrSent)
                  // console.log(gettedOpetrSent)
                  if ((inputOperator.length > 0) && (inputOperatorDispo > 0)) {
                    if (currrentEditOPtor !== 0) {
                      console.log("Je suis là maintenant")
                      // let x = Math.floor((Math.random() * 1000) + 1) * 2;
                      let gettedOpetrSent = [...stateOperatorsSentByUsers]
                      gettedOpetrSent.find(a => a.id === currrentEditOPtor).name = inputOperator;
                      gettedOpetrSent.find(a => a.id === currrentEditOPtor).dispoForTestEvaluate = parseInt(inputOperatorDispo);
                      setStateOperatorsSentByUsers(gettedOpetrSent)
                      setInputOperatorDispo(0)
                      setInputOperator("")
                      setShowModalAddOperator(false)
                      setCurrentOptor(0)
                      // gettedOpetrSent.push(
                      //   {
                      //     id: parseInt(x),
                      //     name: inputOperator,
                      //     dispoForTestEvaluate: parseInt(inputOperatorDispo),
                      //     programs: []
                      //   }
                      // )
                    }

                    else {
                      let x = Math.floor((Math.random() * 1000) + 1) * 2;
                      let gettedOpetrSent = [...stateOperatorsSentByUsers]
                      gettedOpetrSent.push(
                        {
                          id: parseInt(x),
                          name: inputOperator,
                          dispoForTestEvaluate: parseInt(inputOperatorDispo),
                          programs: []
                        }
                      )

                      setStateOperatorsSentByUsers(gettedOpetrSent)
                      setInputOperatorDispo(0)
                      setInputOperator("")
                      setShowModalAddOperator(false)
                    }
                  }
                }}
                className="add-operator"
                style={{ width: "45%" }}>Valider</div>
              <div
                onClick={() => setShowModalAddOperator(false)}
                className="add-operator-S"
                style={{ width: "45%" }}>Annuler</div>
            </div>
          </div>
        </div>
      }


      {
        showModalAddOperations && <div
          // onClick={() => setShowModalAddOperator(false)}
          className={"add-operators-modals"}>
          <div
            className="add-operators-modals-container">
            <h3>Ajouter une opération</h3>
            <div className='brs' />
            <div className="rows-inputs">
              <div className="input-add">
                <p>Nom de l'opération</p>
                <input
                  type="text"
                  name="add-op"
                  value={inputOperations}
                  onChange={handleChangeInputOperations}
                  id=""
                  className="add-operator-inp"
                  placeholder="Ajouter une opération"
                />
              </div>

              <div className="input-add">
                <p>Nbre d'évaluation</p>
                <input
                  type="number"
                  name="add-op"
                  value={inputOperationsCandidate}
                  onChange={handleChangeInputOperationsCandidate}
                  id=""
                  className="add-operator-inp"
                />
              </div>
            </div>
            <div className="rows-inputs" style={{ marginTop: 15 }}>
              <div
                onClick={() => {

                  // setStateOperatorsSentByUsers(gettedOpetrSent)
                  // console.log(gettedOpetrSent)
                  if ((inputOperations.length > 0) && (inputOperationsCandidate > 0)) {
                    let x = Math.floor((Math.random() * 1000) + 1) * 2;
                    let gettedOpetrSent = [...stateOperationsSentByUsers]
                    gettedOpetrSent.push(
                      {
                        id: x,
                        candidate: inputOperations,
                        testEvaluate: parseInt(inputOperationsCandidate),
                      }
                    )
                    setStateOperationsSentByUsers(gettedOpetrSent)
                    setInputOperationsCandidate(0)
                    setInputOperations("")
                    setShowModalAddOperations(false)
                  }

                  if ((inputOperations.length > 0) && (inputOperationsCandidate > 0)) {
                    if (currrentEditOPtion !== 0) {
                      // console.log("Je suis là maintenant")
                      // let x = Math.floor((Math.random() * 1000) + 1) * 2;
                      let gettedOpetrSent = [...stateOperationsSentByUsers]
                      gettedOpetrSent.find(a => a.id === currrentEditOPtion).candidate = inputOperations;
                      gettedOpetrSent.find(a => a.id === currrentEditOPtion).testEvaluate = parseInt(inputOperationsCandidate);
                      setStateOperationsSentByUsers(gettedOpetrSent)
                      setInputOperationsCandidate(0)
                      setInputOperations("")
                      setShowModalAddOperations(false)
                      setCurrentOption(0)
                      // gettedOpetrSent.push(
                      //   {
                      //     id: parseInt(x),
                      //     name: inputOperator,
                      //     dispoForTestEvaluate: parseInt(inputOperatorDispo),
                      //     programs: []
                      //   }
                      // )
                    }

                    else {
                      let x = Math.floor((Math.random() * 1000) + 1) * 2;
                      let gettedOpetrSent = [...stateOperationsSentByUsers]
                      gettedOpetrSent.push(
                        {
                          id: parseInt(x),
                          candidate: inputOperations,
                          testEvaluate: parseInt(inputOperationsCandidate),
                        }
                      )

                      setStateOperationsSentByUsers(gettedOpetrSent)
                      setInputOperationsCandidate(0)
                      setInputOperations("")
                      setShowModalAddOperations(false)
                      setCurrentOption(0)
                    }
                  }
                }}
                className="add-operator"
                style={{ width: "45%" }}>Valider</div>
              <div
                onClick={() => setShowModalAddOperations(false)}
                className="add-operator-S"
                style={{ width: "45%" }}>Annuler</div>
            </div>
          </div>
        </div>
      }
      <div className="sides">
        <div className="sides-bar">
          <div className="padY15X15">
            <div className="user-infos">
              <div className="custom-logo">
                <IO5Icon.IoIceCreamSharp
                  color="white"
                  size={30}
                />
              </div>
              <div className="user-infos-user">
                <h3>Jean Durant</h3>
                <p>Teams Plan</p>
              </div>
            </div>

            <div className="side-input">
              <span className="side-input-icon">
                <IO5Icon.IoSearchOutline
                  color="rgb(10,10,10)"
                  size={15}
                />
              </span>
              <input type="text"
                name=""
                id=""
                placeholder="Recherche rapide"
              />
            </div>

            <div className="rows endpoint">
              <IO5Icon.IoStar
                color="rgba(10,10,10,.5)"
                size={15}
              />
              <p>Activity</p>
            </div>

            <div className="rows space-Hori endpoint flexWrap">
              <div className="rows">
                <IO5Icon.IoStopwatch
                  color="rgba(10,10,10,.5)"
                  size={15}
                />
                <p>All updates</p>
              </div>
              <span className="custom-badge-red">9</span>
            </div>

            <div className="rows endpoint">
              <IO5Icon.IoSettings
                color="rgba(10,10,10,.5)"
                size={15}
              />
              <p>Activity</p>
            </div>
          </div>

          <div className="workspace">

          </div>
        </div>
        <div className="sides-content">
          <div className="padY15X2 pB0">
            <div className="rows space-Hori">
              <div className="">
                <div className="rows">
                  <IoIosAnalytics />
                  <p className="tXs">Client Projects</p>
                </div>
                <p className="tS bold">Managment Desktop App</p>
              </div>
              <div className="rightInvite rows">
                <div className="personnal-l">
                  <img src={User} />
                  <img src={User} />
                  <img src={User} />
                  <div className="vImg">9+</div>
                </div>
                <div className="btn-tr">
                  <AiOutlinePlus
                    size={12.5}
                    color='rgba(50,50,220)'
                  />
                  <p>Inviter</p>
                </div>
                <div className="btn-change-theme gap25">
                  <div
                    onClick={() => {
                      setThemeActive("light")
                    }}
                    className={themeActive === "light" ? "btn-d-1" : "btn-d-0"}
                  >
                    <IO5Icon.IoSunnySharp
                      size={10}
                      color={themeActive === "light" ? 'rgba(50,50,220)' : 'rgba(10,10,10,.5)'}
                    />
                  </div>

                  <div
                    onClick={() => {
                      setThemeActive("dark")
                    }}
                    className={themeActive === "dark" ? "btn-d-2" : "btn-d-0"}
                  >
                    <IO5Icon.IoMoon
                      size={10}
                      color={themeActive === "dark" ? 'white' : 'rgba(10,10,10,.5)'}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="content-dashed rows space-Hori">
              <div className="content-dashed-tabs">
                {
                  listTabs.map((item) => {
                    return (<>
                      <div
                        onClick={() => setSelectedTab(item.name)}
                        key={item.id}
                        className={item.name === selectedTab ? "content-dashed-tabs-item activeTbI"
                          : "content-dashed-tabs-item"}>
                        <IoIosApps />
                        <p>{item.name}</p>
                      </div>
                    </>)
                  })
                }
              </div>
              <div className="content-dashed-filter">
                <div className="rows gap25">
                  <div
                    onClick={() => setShowSearchF(!showSearchF)}
                    className="iAR">
                    {
                      showSearchF ?
                        <IoIosArrowForward
                          color='white'
                          size={16}
                        />
                        : <IoIosSearch
                          color='white'
                          size={16} />
                    }
                  </div>
                  <input
                    type="text"
                    className={showSearchF ? "dashed-inputF activeSrF" : "dashed-inputF"}
                    placeholder="Rechercher"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="content-dynamic">
            {
              selectedTab === listTabs[0].name && (
                <>
                  <div className="content-content padY15X2">
                    <div className="sh-body">
                      <div className="rows space-Hori sh-body-header bgWarning">
                        <div className="rows sh-body-header-title">
                          <p>Next Up</p>
                          <span className="custom-badge">2</span>
                        </div>
                        <div className="custom-btn">
                          <AiOutlinePlus
                            size={15}
                            color='white'
                          />
                        </div>
                      </div>
                      <div className="sh-body-content">
                        <div className="sh-body-content-top">
                          <p>Presentation</p>
                          <h2>Mockups</h2>
                        </div>
                        <div className="sh-body-content-center">
                          <p>Create 15 mockups with a mobile (Iphone 13) view.</p>

                          <div className="sh-body-content-center-collabs rows">
                            <img src={User} />
                            <span className="custom-badgeCollaps">Mind</span>
                          </div>
                        </div>
                        <div className="sh-body-content-bottom">
                          <div className="rows">
                            <div className="rows">
                              <IO5Icon.IoChatbubblesOutline
                                color='rgb(80,80,80)'
                              />
                              <p className="shBCBP">2</p>
                            </div>

                            <div className="rows">
                              <IO5Icon.IoInfiniteOutline
                                color='rgb(80,80,80)' />
                              <p className="shBCBP">2</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sh-body-content">
                        <div className="sh-body-content-top">
                          <p>Presentation</p>
                          <h2>Mockups</h2>
                        </div>
                        <div className="sh-body-content-center">
                          <p>Create 15 mockups with a mobile (Iphone 13) view.</p>

                          <div className="sh-body-content-center-collabs rows">
                            <img src={User} />
                            <span className="custom-badgeCollaps">Mind</span>
                          </div>
                        </div>
                        <div className="sh-body-content-bottom">
                          <div className="rows">
                            <div className="rows">
                              <IO5Icon.IoChatbubblesOutline
                                color='rgb(80,80,80)'
                              />
                              <p className="shBCBP">2</p>
                            </div>

                            <div className="rows">
                              <IO5Icon.IoInfiniteOutline
                                color='rgb(80,80,80)' />
                              <p className="shBCBP">2</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sh-body-button rows space-center">
                        <AiOutlinePlus
                          size={12.5}
                          color='rgba(50,50,220)'
                        />
                        <p>Add Card</p>
                      </div>
                    </div>

                    <div className="sh-body">
                      <div className="rows space-Hori sh-body-header bgInprogress">
                        <div className="rows sh-body-header-title">
                          <p>Next Up</p>
                          <span className="custom-badge">2</span>
                        </div>
                        <div className="custom-btn">
                          <AiOutlinePlus
                            size={15}
                            color='white'
                          />
                        </div>
                      </div>
                      <div className="sh-body-content">
                        <div className="sh-body-content-top">
                          <p>Presentation</p>
                          <h2>Mockups</h2>
                        </div>
                        <div className="sh-body-content-center">
                          <p>Create 15 mockups with a mobile (Iphone 13) view.</p>

                          <div className="sh-body-content-center-collabs rows">
                            <img src={User} />
                            <span className="custom-badgeCollaps">Mind</span>
                          </div>
                        </div>
                        <div className="sh-body-content-bottom">
                          <div className="rows">
                            <div className="rows">
                              <IO5Icon.IoChatbubblesOutline
                                color='rgb(80,80,80)'
                              />
                              <p className="shBCBP">2</p>
                            </div>

                            <div className="rows">
                              <IO5Icon.IoInfiniteOutline
                                color='rgb(80,80,80)' />
                              <p className="shBCBP">2</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sh-body-button rows space-center">
                        <AiOutlinePlus
                          size={12.5}
                          color='rgba(50,50,220)'
                        />
                        <p>Add Card</p>
                      </div>
                    </div>

                    <div className="sh-body">
                      <div className="rows space-Hori sh-body-header bgPrimary">
                        <div className="rows sh-body-header-title">
                          <p>Next Up</p>
                          <span className="custom-badge">2</span>
                        </div>
                        <div className="custom-btn">
                          <AiOutlinePlus
                            size={15}
                            color='white'
                          />
                        </div>
                      </div>
                      <div className="sh-body-content">
                        <div className="sh-body-content-top">
                          <p>Presentation</p>
                          <h2>Mockups</h2>
                        </div>
                        <div className="sh-body-content-center">
                          <p>Create 15 mockups with a mobile (Iphone 13) view.</p>

                          <div className="sh-body-content-center-collabs rows">
                            <img src={User} />
                            <span className="custom-badgeCollaps">Mind</span>
                          </div>
                        </div>
                        <div className="sh-body-content-bottom">
                          <div className="rows">
                            <div className="rows">
                              <IO5Icon.IoChatbubblesOutline
                                color='rgb(80,80,80)'
                              />
                              <p className="shBCBP">2</p>
                            </div>

                            <div className="rows">
                              <IO5Icon.IoInfiniteOutline
                                color='rgb(80,80,80)' />
                              <p className="shBCBP">2</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sh-body-button rows space-center">
                        <AiOutlinePlus
                          size={12.5}
                          color='rgba(50,50,220)'
                        />
                        <p>Add Card</p>
                      </div>
                    </div>

                    <div className="sh-body">
                      <div className="rows space-Hori sh-body-header bgSucces">
                        <div className="rows sh-body-header-title">
                          <p>Next Up</p>
                          <span className="custom-badge">2</span>
                        </div>
                        <div className="custom-btn">
                          <AiOutlinePlus
                            size={15}
                            color='white'
                          />
                        </div>
                      </div>
                      <div className="sh-body-content">
                        <div className="sh-body-content-top">
                          <p>Presentation</p>
                          <h2>Mockups</h2>
                        </div>
                        <div className="sh-body-content-center">
                          <p>Create 15 mockups with a mobile (Iphone 13) view.</p>

                          <div className="sh-body-content-center-collabs rows">
                            <img src={User} />
                            <span className="custom-badgeCollaps">Mind</span>
                          </div>
                        </div>
                        <div className="sh-body-content-bottom">
                          <div className="rows">
                            <div className="rows">
                              <IO5Icon.IoChatbubblesOutline
                                color='rgb(80,80,80)'
                              />
                              <p className="shBCBP">2</p>
                            </div>

                            <div className="rows">
                              <IO5Icon.IoInfiniteOutline
                                color='rgb(80,80,80)' />
                              <p className="shBCBP">2</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sh-body-button rows space-center">
                        <AiOutlinePlus
                          size={12.5}
                          color='rgba(50,50,220)'
                        />
                        <p>Add Card</p>
                      </div>
                    </div>
                  </div>
                </>
              )
            }

            {
              selectedTab === listTabs[1].name && (
                <>
                  <div className="assignee rows space-Hori space-verti-fStart flexWrap">
                    <div className="assignee-operations">
                      <div className="rows space-Hori assignee-operators-tAdd ">
                        <h2 className="assignee-operators-title">
                          Liste des opérations
                        </h2>
                        <div

                          onClick={() => {
                            setInputOperations("")
                            setInputOperationsCandidate(0)
                            setShowModalAddOperations(true)
                          }}
                          className="ico-A">
                          <IO5Icon.IoAdd
                            size={15}
                            color='white' />
                        </div>
                      </div>

                      {
                        stateOperationsSentByUsers.map(item => {
                          return (
                            <>
                              <div className="assignee-operations-item rows space-Hori gap100">

                                <div className="rows gap100">

                                  <div className="assignee-operations-item-description">
                                    <p className="title">Operations name</p>
                                    <p>{item.candidate || "Non défini"}</p>
                                  </div>

                                </div>

                                <div className="assignee-operations-item-description">
                                  <p className="title">Evaluations nbr</p>
                                  <p>{item.testEvaluate || 0}</p>
                                </div>

                                <div className="rows">
                                  <div
                                    // onClick={() => {
                                    //   setStateOperatorsSentByUsers(stateOperatorsSentByUsers
                                    //     .filter(ist => ist.id !== item.id))
                                    // }}
                                    onClick={() => {
                                      setCurrentOption(parseInt(item.id));
                                      setInputOperations(stateOperationsSentByUsers
                                        .filter(it => it.id === item.id)[0]?.candidate);
                                      setInputOperationsCandidate(stateOperationsSentByUsers
                                        .filter(it => it.id === item.id)[0]?.testEvaluate);
                                      // console.log("fd", )
                                      setShowModalAddOperations(true)
                                    }}
                                    className="ico-AE">
                                    <IO5Icon.IoBrush
                                      size={15}
                                      color='white' />
                                  </div>
                                  <div
                                    onClick={() => {
                                      setStateOperationsSentByUsers(stateOperationsSentByUsers.filter(ist => ist.id !== item.id))
                                    }}
                                    className="ico-S">
                                    <IO5Icon.IoClose
                                      size={15}
                                      color='white' />
                                  </div>

                                </div>

                              </div>
                            </>
                          )
                        })
                      }

                      {
                        stateOperationsSentByUsers.length === 0 && (
                          <>
                            <p className="noDText">Aucune opération n'a été ajoutée</p>
                          </>
                        )
                      }
                    </div>


                    <div className="assignee-operators">
                      <div className="rows space-Hori assignee-operators-tAdd ">
                        <h2 className="assignee-operators-title">
                          Liste des opérateurs
                        </h2>

                        <div
                          onClick={() => {
                            setInputOperator("")
                            setInputOperatorDispo(0)
                            setShowModalAddOperator(true)
                          }}
                          className="ico-A">
                          <IO5Icon.IoAdd
                            size={15}
                            color='white' />
                        </div>
                      </div>
                      {
                        stateOperatorsSentByUsers.map(item => {
                          return (
                            <>
                              <div className="assignee-operators-item rows space-Hori gap100">

                                <div className="rows gap100">

                                  <div className="assignee-operators-item-img n-Img">
                                    <img src={User} />
                                  </div>

                                  <div className="assignee-operators-item-description">
                                    <p className="title">Name</p>
                                    <p>{item.name}</p>
                                  </div>

                                </div>

                                <div className="assignee-operators-item-description">
                                  <p className="title">Disponibilité (test-evaluate)</p>
                                  <p>{item.dispoForTestEvaluate}</p>
                                </div>

                                <div className="rows">
                                  <div
                                    // onClick={() => {
                                    //   setStateOperatorsSentByUsers(stateOperatorsSentByUsers
                                    //     .filter(ist => ist.id !== item.id))
                                    // }}

                                    onClick={() => {
                                      setCurrentOptor(parseInt(item.id));
                                      setInputOperator(stateOperatorsSentByUsers.filter(it => it.id === item.id)[0]?.name);
                                      setInputOperatorDispo(stateOperatorsSentByUsers.filter(it => it.id === item.id)[0]?.dispoForTestEvaluate);
                                      // console.log("fd", )
                                      setShowModalAddOperator(true)
                                    }}
                                    className="ico-AE">
                                    <IO5Icon.IoBrush
                                      size={15}
                                      color='white' />
                                  </div>
                                  <div
                                    onClick={() => {
                                      setStateOperatorsSentByUsers(stateOperatorsSentByUsers
                                        .filter(ist => ist.id !== item.id))
                                    }}
                                    className="ico-S">
                                    <IO5Icon.IoClose
                                      size={15}
                                      color='white' />
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }

                      {
                        stateOperatorsSentByUsers.length === 0 && (
                          <>
                            <p className="noDText">Aucune opérateur n'a été ajoutée</p>
                          </>
                        )
                      }
                    </div>


                    {
                      ((stateOperatorsSentByUsers.length > 0) &&
                        (stateOperationsSentByUsers.length > 0)) && (
                        <>
                          <div
                            onClick={() => {
                              // setStateOperations([])
                              // setStateProgramsDays([])
                              // let sendingParsedOperations = JSON.parse(JSON.stringify(stateOperationsSentByUsers))
                              // let sendingParsedOperators = stateOperatorsSentByUsers
                              setDays(0)
                              setStateProgramsDays([])
                              setStateOperateurs([...stateOperatorsSentByUsers])
                              setStateOperations([...stateOperationsSentByUsers])
                              // setStateOperateurs(stateOperatorsSentByUsers)
                              // console.log("ise", [...stateOperatorsSentByUsers])
                              // console.log("stateOperationsSentByUsers", ...stateOperationsSentByUsers)
                            }}
                            className="add-operator mt1 rows gap5">
                            <p>Créer le programme</p>
                            <IO5Icon.IoCalendarSharp
                              size={15}
                              className="change"
                            />
                          </div>
                        </>
                      )
                    }

                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
      {/* 
      <div className="App-container">
        <div
          // onClick={() => setShowModalAddOperator(true)}
          className="add-operator">Générer le programme</div>
      </div>

      <div className="App-container">
        <div className="operateur-section">
          <h2>Ajoutez un opérateur</h2>
          <div
            onClick={() => setShowModalAddOperator(true)}
            className="add-operator">Ajouter</div>
        </div>

        <div className="" style={{ marginTop: "1rem" }}>

          <h2 style={{ textAlign: "center" }}>Liste des opérateurs</h2>
          {
            stateOperatorsSentByUsers.map((operateur) => {
              return (
                <>
                  <div className="operator-item" key={`${operateur.id}`}>
                    <div className="operator-item-text">
                      <p className="text">Operateur:</p>
                      <p className="data">
                        {operateur.name}
                      </p>
                    </div>

                    <div className="operator-item-text">
                      <p className="text">Disponibilité/(jrs):</p>
                      <p className="data">
                        {operateur.dispoForTestEvaluate}
                      </p>
                    </div>

                    <div className="operator-item-text">
                      <p className="text">Programs:</p>
                      <p className="data">
                        {operateur.programs.length > 0 ? "[]" : "Non défini"}
                      </p>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>

      <div className="App-container">
        <div className="operateur-section">
          <h2>Ajoutez une opération</h2>
          <div
            onClick={() => setShowModalAddOperations(true)}
            className="add-operator">Ajouter</div>
        </div>

        <div className="" style={{ marginTop: "1rem" }}>

          <h2 style={{ textAlign: "center" }}>Liste des opérations</h2>
          {
            stateOperationsSentByUsers.map((operateur) => {
              return (
                <>
                  <div className="operator-item" key={`${operateur.id}`}>
                    <div className="operator-item-text">
                      <p className="text">Opératin:</p>
                      <p className="data">
                        {operateur.candidate}
                      </p>
                    </div>

                    <div className="operator-item-text">
                      <p className="text">Test d'évaluation:</p>
                      <p className="data">
                        {operateur.testEvaluate}
                      </p>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div> */}
    </div>
  )
}


{/* <Header />
        <Nav />
        <About />
        <Experience />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
*/}
export default App;