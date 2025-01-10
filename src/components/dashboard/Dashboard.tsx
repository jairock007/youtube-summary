import React, { useState } from 'react';
import { AlertCircle, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const YouTubeSummarizer = () => {
    const [url, setUrl] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isValidYouTubeUrl = (url) => {
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return pattern.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidYouTubeUrl(url)) {
            setError('Please enter a valid YouTube URL');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // This is where you would integrate with your backend
            // const response = await fetch('/api/summarize', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ url })
            // });
            // const data = await response.json();
            // setSummary(data.summary);

            // For demo purposes, simulate API call
            setTimeout(() => {
                setSummary('Upon thorough analysis, this summary serves as a provisional narrative. In an actual deployment, this placeholder will be supplanted with a comprehensive and nuanced AI-generated elucidation of the content encapsulated within the YouTube video, integrating thematic elements, contextual relevance, and key insights.');
                setLoading(false);
            }, 5000);
        } catch (err) {
            setError('Failed to generate summary. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>YouTube Video Summarizer</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Enter YouTube URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="flex-1"
                            />
                            <Button
                                type="submit"
                                disabled={loading || !url}
                            >
                                {loading ? (
                                    <div className="animate-spin">⌛</div>
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </Button>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {summary && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium mb-2">Summary</h3>
                                <p className="text-gray-700">{summary}</p>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default YouTubeSummarizer;