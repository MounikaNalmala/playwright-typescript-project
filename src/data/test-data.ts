export const testData = {
  urls: {
    locations: '/lp',
    edmonton: '/lp/edmonton-ab',
    edmontonSearch: '/search?freeText=Edmonton'
  },
  locationsPage: {
    heading: 'Locations',
    introText: /over 60 permanent auction sites and local yards/i,
    satelliteNote: /satellite sites.*asterisk/i,
    countries: ['United States', 'Canada', 'Australia', 'United Kingdom', 'Netherlands', 'UAE'],
    locations: {
      unitedStates: {
        country: 'United States',
        nextCountry: 'Canada',
        minimumCount: 20,
        sites: ['Phoenix', 'Salt Lake City', 'Houston', 'Las Vegas', 'Atlanta']
      },
      canada: {
        country: 'Canada',
        nextCountry: 'Australia',
        minimumCount: 10,
        sites: ['Edmonton', 'Montreal', 'Toronto', 'Regina', 'Saskatoon']
      }
    },
    satelliteLocations: ['San Antonio', 'Calgary, AB'],
    permanentLocations: ['Phoenix', 'Edmonton'],
    minimumCounts: { satelliteSites: 15, permanentSites: 25, totalSites: 60 },
    edmonton: {
      name: 'Edmonton',
      country: 'Canada',
      nextCountry: 'Australia',
      expectedUrl: /\/lp\/edmonton-ab/i,
      heading: 'Edmonton'
    }
  },
  edmonton: {
    heading: 'Edmonton',
    addressParts: ['1500 Sparrow Drive', 'Nisku', 'AB', 'T9E 8H6'],
    officeHours: /Mon\s*-\s*Fri/i,
    timeRange: /\d{1,2}:\d{2}\s*(AM|PM)\s*-\s*\d{1,2}:\d{2}\s*(AM|PM)/i,
    auctionEvents: {
      heading: 'Auction events',
      minimumCount: 1,
      dateRange: /[A-Z][a-z]{2}\s+\d{1,2}\s*-\s*[A-Z][a-z]{2}\s+\d{1,2}/
    },
    aboutYard: {
      heading: /about this yard/i,
      expectedText: [/weekdays/i, /drop-off/i, /inspection/i, /pick-up/i]
    },
    itemsInYard: {
      heading: /items in yard/i,
      minimumCount: 5,
      requiredEquipment: 'Excavators',
      additionalEquipment: [
        'Harvesting Equipment',
        'Agricultural Tractors',
        'Sprayers',
        'Excavator Attachments'
      ],
      quantity: /\d+\s+items?/i
    }
  },
  search: { query: 'Edmonton', minimumResultCount: 0, titlesToLog: 5 },
  api: {
    locations: {
      minimumLocationCount: 60,
      minimumSatelliteCount: 15,
      minimumPermanentCount: 25,
      minimumCountryCount: 8,
      siteTypes: { satellite: 'Satellite', permanent: 'Permanent' },
      expectedLocations: [
        { name: 'Edmonton', countries: ['Canada', 'CAN'] },
        { name: 'Phoenix', countries: ['United States', 'USA'] }
      ],
      expectedCountries: [
        ['United States', 'USA'],
        ['Canada', 'CAN']
      ]
    },
    edmontonYard: {
      name: 'Edmonton',
      addressParts: ['1500 Sparrow Drive', 'Nisku', 'T9E 8H6'],
      eventLocations: ['Edmonton', 'Nisku'],
      minimumEventCount: 1,
      minimumCategoryCount: 5,
      requiredCategory: 'Excavators'
    },
    inventorySearch: {
      endpoint: '/api/search',
      searchText: 'Edmonton',
      expectedStatus: 200,
      titlesToLog: 5
    },
    negative: {
      unknownLocation: 'Automation Test Yard 99999',
      unknownEquipmentCategory: 'Automation Test Equipment 99999',
      unknownSearchText: 'zzzzautomationtest99999'
    }
  }
} as const;
