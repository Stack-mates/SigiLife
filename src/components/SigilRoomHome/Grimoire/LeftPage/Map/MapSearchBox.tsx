import { SearchBox } from '@mapbox/search-js-react';

export default function MapSearchBox({ onRetrieve, accessToken }: { onRetrieve: (res: any) => void, accessToken: string }) {
  return (
    <div style={{ width: '100%', maxWidth: '420px' }}>
      <SearchBox
        accessToken={accessToken}
        onRetrieve={(res) => {
          console.log("Search result:", res);
          onRetrieve(res);
        }}
        placeholder="Search for a location..."
        theme={{
          variables: {
            fontFamily: '"New Rocker", system-ui',
            unit: '22px',
            borderRadius: '12px',
            colorPrimary: '#9e38fd',
            colorBackground: 'rgba(255, 255, 255, 0.95)', // Nearly white for max visibility
            colorText: '#000000',
          }
        }}
        
      />
    </div>
  )
};