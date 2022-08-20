import { getRandomNumber, getRandomIndex } from '../util.js';
import { DESTINATION_POINT_NAMES, DESTINATION_POINT_DESCRIPTION, DESTINATION_POINT_PICTURE_DESCRIPTION } from './mock-data.js';
import { destinations } from './route-point.js';

const generateDestinationPointDescription = () => DESTINATION_POINT_DESCRIPTION[ getRandomIndex(DESTINATION_POINT_DESCRIPTION) ];

const generateDestinationPointName = () => DESTINATION_POINT_NAMES[ getRandomIndex(DESTINATION_POINT_NAMES) ];

const getDestinationPointPictureSrc = () => `http://picsum.photos/300/200?r=${ getRandomNumber(0, 100) }`;

const getDestinationPointPictureDescription = () => DESTINATION_POINT_PICTURE_DESCRIPTION[ getRandomIndex(DESTINATION_POINT_PICTURE_DESCRIPTION) ];

const makePictures = () => (
  {
    'src': getDestinationPointPictureSrc(),
    'description': getDestinationPointPictureDescription()
  }
);

const generateDestinationPoint = (element) => (
  {
    'id': element,
    'description': generateDestinationPointDescription(),
    'name': generateDestinationPointName(),
    'pictures': Array.from({length: destinations.length}, makePictures)
  }
);

const makeDestinations = () => {
  const destinationPoints = [];
  destinations.forEach( (element) => {
    destinationPoints.push(generateDestinationPoint(element) );
  } );
  return destinationPoints;
};

export { makeDestinations };
