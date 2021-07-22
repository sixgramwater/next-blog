import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
const _HEIGHT = 20;
const _WIDTH = 10;
const _BRICK_TYPE_L = [[0,0], [0,1], [0,2], [-1,0]]
const _BRICK_TYPE_I = [[0,0], [1,0], [2,0], [3,0]]

const defaultSceneArray = new Array(_HEIGHT).fill(0).map(new Array(_WIDTH).fill(0));
const Tetris = () => {
  const [scene, setScene] = useState(defaultSceneArray); 
  const [curBrick, setCurBrick] = useState([]);
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const mapCordinates = (brickModel, offsetX, offsetY) => {
    // const brickModel = [];
    const mappedCordinates = brickModel.map((cord, index)=>{
      const mid = Math.floor(_WIDTH/2);
      const y = cord[0];
      const x = cord[1];
      return [y+offsetY, x+mid+offsetX]; // to-do: find real mid point
    })
    return mappedCordinates;
  }
  const rotate = () => {
    // to-dos: different bricks has different rotate axises;

  }

  const updateRotate = () => {

  }

  const updateFall = () => {
    if(!ifCollapsed(curBrick) && !ifHitBottom(curBrick)) {
      setOffsetY(y=>y+1);
    } else {
      updateScene(curBrick);
    }
    
  }
  const updateScene = (brick) => {
    let temp = [...scene];
    brick.forEach(cord=>{
      temp[cord[0]][cord[1]] = 1;
    });
    setScene(temp);
  }

  const updatePos = (direction) => {
    if(direction==='left' && offsetX > 0) {
      setOffsetX(x=>x-1);
    }
    if(direction === 'right' && offsetX < _WIDTH-1) {
      setOffsetX(x=>x+1);
    }
  }
  const ifCollapsed = (brick) => {
    // generate bounding box and test with includes function
    let set = new Set();
    brick.forEach(cord=>{
      set.add([
        [cord[0]-1, cord[1]],
        [cord[0]+1, cord[1]],
        [cord[0], cord[1]-1],
        [cord[0], cord[1]+1],
      ])
    });
    let boundingBoxes = [...set];
    let collapsed = false;
    boundingBoxes.forEach(cord=>{
      if(scene.find((sceneCord)=>
        (cord[0] === sceneCord[0] && cord[1] === sceneCord[1])
      )) {
        collapsed = true;
      }
    })
    return collapsed;
  }
  const ifHitBottom = (brick) => {
    const offsetYCollection = brick.map(cord=>cord[0]);
    return Math.max(offsetYCollection) >= _HEIGHT-1;
  }

  const ifContainCurBrick = (row, column) => {
    if(curBrick.find(cord=>cord[0]===row && cord[1]===column)) {
      return true;
    } else {
      return false;
    }
  }

  return(
    <div className="tetris-container">
      <div className="scene">
      {
        scene.map((layer, rowId)=>{
          return(
            <div className="row" key={rowId}>
              {
                layer.map((grid, columnId)=>{
                  return(
                    <div className={classNames('grid', {
                      'scene-grid': grid === 1,
                      'cur-grid': ifContainCurBrick(rowId, columnId)
                    })} 
                    key={rowId+"-"+columnId}></div>
                  )
                })
              }
            </div>
          )
          
        })
      }
    </div>
    </div>
  )
}