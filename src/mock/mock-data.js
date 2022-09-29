const CURRENT_OFFERS_COUNT = 10;

const DESTINATION_POINT_DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra',
];

const DESTINATION_POINT_NAMES = [
  'Chamonix',
  'Paris',
  'Leon',
  'Burgundia',
  'Merlo'
];

const DESTINATION_POINT_PICTURE_DESCRIPTION = [
  'Chamonix parliament building',
  'Aliquam erat volutpat',
  'Nunc fermentum tortor ac porta dapibus',
  'Who is on duty today?',
  'I am on duty today!',
];

const OFFER_BY_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 190
      },
      {
        'id': 2,
        'title': 'Choose the radio station',
        'price': 30
      },
      {
        'id': 3,
        'title': 'Choose temperature',
        'price': 170
      },
      {
        'id': 4,
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 100
      },
      {
        'id': 5,
        'title': 'Drive slowly',
        'price': 110
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        'id': 1,
        'title': 'Infotainment system',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Order meal',
        'price': 100
      },
      {
        'id': 3,
        'title': 'Choose seats',
        'price': 190
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        'id': 1,
        'title': 'Infotainment system',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Order meal',
        'price': 100
      },
      {
        'id': 3,
        'title': 'Choose seats',
        'price': 190
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        'id': 1,
        'title': 'Infotainment system',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Order meal',
        'price': 100
      },
      {
        'id': 3,
        'title': 'Choose seats',
        'price': 190
      },
      {
        'id': 4,
        'title': 'Dive',
        'price': 400
      },
      {
        'id': 5,
        'title': 'We will call you "Cap"',
        'price': 40000
      },
      {
        'id': 6,
        'title': 'Yo Ho Ho and a bottle of rum',
        'price': 'priceless'
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        'id': 1,
        'title': 'Infotainment system',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Order meal',
        'price': 100
      },
      {
        'id': 3,
        'title': 'Choose seats',
        'price': 190
      },
      {
        'id': 4,
        'title': 'Red Ferrari',
        'price': 1190
      },
      {
        'id': 5,
        'title': 'Synthwave 84 music',
        'price': 0
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        'id': 1,
        'title': 'Infotainment system',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Order meal',
        'price': 100
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        'id': 1,
        'title': 'Check-in',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Order meal',
        'price': 100
      },
      {
        'id': 3,
        'title': 'Order wine',
        'price': 190
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        'id': 1,
        'title': 'Infotainment system',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Lighthouse',
        'price': 10000
      },
      {
        'id': 3,
        'title': 'Choose seats',
        'price': 290
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        'id': 1,
        'title': 'Order meal',
        'price': 100
      },
      {
        'id': 2,
        'title': 'Choose seats',
        'price': 190
      }
    ]
  }
];

export { OFFERS,
  OFFER_BY_TYPE,
  DESTINATION_POINT_PICTURE_DESCRIPTION,
  DESTINATION_POINT_NAMES,
  DESTINATION_POINT_DESCRIPTION,
  CURRENT_OFFERS_COUNT };
