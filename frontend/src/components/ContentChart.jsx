import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { userAuthStore } from '../../store/userAuthStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Filter, BarChart3, PieChart, TrendingUp, Activity, Target } from 'lucide-react';
import { 
  LineChartComponent, 
  AreaChartComponent, 
  BarChartComponent, 
  PieChartComponent, 
  DoughnutChartComponent,
  StatsCard 
} from './ui/charts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ContentChart = ({ stats }) => {
  const { isDarkMode } = userAuthStore();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [chartType, setChartType] = useState('bar');

  // Filter data based on selection
  const getFilteredData = () => {
    const allData = {
      labels: ['Videos', 'Articles', 'Tweets', 'Instagram', 'Reddit'],
      data: [stats.videos, stats.articles, stats.tweets, stats.instagram, stats.reddits],
    };

    if (selectedFilter === 'all') {
      return allData;
    }

    const filterMap = {
      videos: { labels: ['Videos'], data: [stats.videos] },
      articles: { labels: ['Articles'], data: [stats.articles] },
      tweets: { labels: ['Tweets'], data: [stats.tweets] },
      instagram: { labels: ['Instagram'], data: [stats.instagram] },
      reddits: { labels: ['Reddit'], data: [stats.reddits] },
    };

    return filterMap[selectedFilter] || allData;
  };

  const filteredData = getFilteredData();

  // Prepare data for recharts components
  const getRechartsData = () => {
    const data = [
      { name: 'Videos', value: stats.videos },
      { name: 'Articles', value: stats.articles },
      { name: 'Tweets', value: stats.tweets },
      { name: 'Instagram', value: stats.instagram },
      { name: 'Reddit', value: stats.reddits },
    ];

    if (selectedFilter !== 'all') {
      const filterMap = {
        videos: [{ name: 'Videos', value: stats.videos }],
        articles: [{ name: 'Articles', value: stats.articles }],
        tweets: [{ name: 'Tweets', value: stats.tweets }],
        instagram: [{ name: 'Instagram', value: stats.instagram }],
        reddits: [{ name: 'Reddit', value: stats.reddits }],
      };
      return filterMap[selectedFilter] || data;
    }

    return data;
  };

  // Prepare time series data for line and area charts
  const getTimeSeriesData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const baseData = {
      videos: [2, 3, 1, 4, 2, 3],
      articles: [1, 2, 3, 2, 4, 1],
      tweets: [5, 7, 4, 6, 8, 5],
      instagram: [3, 4, 2, 5, 3, 4],
      reddits: [2, 1, 3, 2, 1, 2],
    };

    return months.map((month, index) => ({
      name: month,
      videos: baseData.videos[index],
      articles: baseData.articles[index],
      tweets: baseData.tweets[index],
      instagram: baseData.instagram[index],
      reddits: baseData.reddits[index],
    }));
  };

  const barData = {
    labels: filteredData.labels,
    datasets: [
      {
        label: 'Content Count',
        data: filteredData.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ].slice(0, filteredData.labels.length),
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ].slice(0, filteredData.labels.length),
        borderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: filteredData.labels,
    datasets: [
      {
        data: filteredData.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ].slice(0, filteredData.labels.length),
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ].slice(0, filteredData.labels.length),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
      },
      title: {
        display: true,
        text: selectedFilter === 'all' ? 'Content Distribution' : `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Content`,
        color: isDarkMode ? '#ffffff' : '#000000',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000',
          padding: 20,
        },
      },
      title: {
        display: true,
        text: selectedFilter === 'all' ? 'Content Breakdown' : `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Breakdown`,
        color: isDarkMode ? '#ffffff' : '#000000',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  const totalContent = stats.videos + stats.articles + stats.tweets + stats.instagram + stats.reddits;
  const filteredTotal = filteredData.data.reduce((sum, val) => sum + val, 0);

  // Render chart based on type
  const renderChart = () => {
    const chartTitle = selectedFilter === 'all' ? 'Content Distribution' : `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Content`;
    const chartDescription = selectedFilter === 'all' ? 'Distribution of content across all platforms' : `Content distribution for ${selectedFilter}`;

    switch (chartType) {
      case 'line':
        return (
          <LineChartComponent
            data={getTimeSeriesData()}
            title={chartTitle}
            description={chartDescription}
            isDarkMode={isDarkMode}
          />
        );
      case 'area':
        return (
          <AreaChartComponent
            data={getTimeSeriesData()}
            title={chartTitle}
            description={chartDescription}
            isDarkMode={isDarkMode}
          />
        );
      case 'bar':
        return (
          <BarChartComponent
            data={getRechartsData()}
            title={chartTitle}
            description={chartDescription}
            isDarkMode={isDarkMode}
          />
        );
      case 'pie':
        return (
          <PieChartComponent
            data={getRechartsData()}
            title={chartTitle}
            description={chartDescription}
            isDarkMode={isDarkMode}
          />
        );
      case 'doughnut':
        return (
          <DoughnutChartComponent
            data={getRechartsData()}
            title={chartTitle}
            description={chartDescription}
            isDarkMode={isDarkMode}
          />
        );
      default:
        return (
          <Card className={isDarkMode ? "bg-[#2E3B4E] text-white border-gray-700" : "bg-white border-gray-200"}>
            <CardContent className="p-6">
              <Bar data={barData} options={chartOptions} />
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards with Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Content"
          value={filteredTotal}
          description={selectedFilter === 'all' ? 'Across all platforms' : `${selectedFilter} content only`}
          icon={Target}
          trend={12.5}
          isDarkMode={isDarkMode}
        />
        <StatsCard
          title="Active Platforms"
          value={Object.values(stats).filter(val => val > 0).length}
          description="Platforms with content"
          icon={Activity}
          trend={8.2}
          isDarkMode={isDarkMode}
        />
        <StatsCard
          title="Growth Rate"
          value="+15%"
          description="This month"
          icon={TrendingUp}
          trend={15}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Filter Controls */}
      <Card className={isDarkMode ? "bg-[#2E3B4E] text-white border-gray-700" : "bg-white border-gray-200"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <CardTitle className="text-lg">Filter & View Options</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Content Type</label>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className={isDarkMode ? "bg-[#1E2939] border-gray-600" : "bg-white border-gray-300"}>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent className={isDarkMode ? "bg-[#1E2939] border-gray-600" : "bg-white border-gray-300"}>
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="videos">Videos Only</SelectItem>
                  <SelectItem value="articles">Articles Only</SelectItem>
                  <SelectItem value="tweets">Tweets Only</SelectItem>
                  <SelectItem value="instagram">Instagram Only</SelectItem>
                  <SelectItem value="reddits">Reddit Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Chart Type</label>
              <Tabs value={chartType} onValueChange={setChartType} className="w-full">
                <TabsList className={isDarkMode ? "bg-[#1E2939]" : "bg-gray-100"}>
                  <TabsTrigger value="bar" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Bar
                  </TabsTrigger>
                  <TabsTrigger value="line" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Line
                  </TabsTrigger>
                  <TabsTrigger value="area" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Area
                  </TabsTrigger>
                  <TabsTrigger value="pie" className="flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Pie
                  </TabsTrigger>
                  <TabsTrigger value="doughnut" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Doughnut
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      {renderChart()}

      {/* Platform Stats */}
      <Card className={isDarkMode ? "bg-[#2E3B4E] text-white border-gray-700" : "bg-white border-gray-200"}>
        <CardHeader>
          <CardTitle className="text-xl">Platform Performance</CardTitle>
          <CardDescription>
            Detailed breakdown of content across platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Videos', count: stats.videos, color: 'bg-red-500' },
              { name: 'Articles', count: stats.articles, color: 'bg-blue-500' },
              { name: 'Tweets', count: stats.tweets, color: 'bg-cyan-500' },
              { name: 'Instagram', count: stats.instagram, color: 'bg-yellow-500' },
              { name: 'Reddit', count: stats.reddits, color: 'bg-purple-500' },
            ].map((platform) => (
              <div key={platform.name} className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className={`w-4 h-4 ${platform.color} rounded-full mx-auto mb-2 group-hover:scale-125 transition-transform`}></div>
                <p className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{platform.name}</p>
                <p className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{platform.count}</p>
                <p className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors">
                  {totalContent > 0 ? `${((platform.count / totalContent) * 100).toFixed(1)}%` : '0%'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentChart; 