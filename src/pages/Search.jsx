import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [interests, setInterests] = useState('');
  const [eventSize, setEventSize] = useState([50]);

  const handleSearch = () => {
    console.log('Searching with:', { searchTerm, filterType, location, date, interests, eventSize });
    // Implement search logic here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search users, events, communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch}>
            <SearchIcon className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="communities">Communities</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Interests (comma-separated)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium mb-2">Event Size</label>
          <Slider
            value={eventSize}
            onValueChange={setEventSize}
            max={100}
            step={1}
          />
          <p className="text-sm mt-1">Max participants: {eventSize}</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        {/* Placeholder for search results */}
        <p>No results to display. Please perform a search.</p>
      </div>
    </div>
  );
};

export default Search;