"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";
import axios from "axios";

type Video = {
  id: string;
  title: string;
  votes: number;
};

export default function MusicVotingPage() {
  const [videoLink, setVideoLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([
    {
      id: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up",
      votes: 5,
    },
    { id: "y6120QOlsfU", title: "Darude - Sandstorm", votes: 3 },
    { id: "L_jWHffIx5E", title: "Smash Mouth - All Star", votes: 2 },
  ]);
  const [currentVideo, setCurrentVideo] = useState("dQw4w9WgXcQ");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(videoLink);
    if (videoId) {
      setQueue([...queue, { id: videoId, title: "New Video", votes: 0 }]);
      setVideoLink("");
    }
  };

  const handleVote = (id: string, increment: number) => {
    setQueue(
      queue
        .map((video) =>
          video.id === id ? { ...video, votes: video.votes + increment } : video
        )
        .sort((a, b) => b.votes - a.votes)
    );
  };

  const extractVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const RefreshStreams = async () => {
    await axios
      .get("/api//streams/my")
      .then((res) => {
        console.log(res);
        setQueue(
          res.data.streams
            .map(({ extractedId, title, upvotes, ...rest }) => ({
              id: extractedId,
              title,
              votes: upvotes.upvotes,
              
            }))
            .sort((a, b) => a.votes > b.votes)
        );
        console.log((res.data.streams
          .map(({ extractedId, title, upvotes, ...rest }) => ({
           
            id: extractedId,
            title,
            votes: upvotes.upvotes,
            
          }))
          .sort((a, b) => a.votes > b.votes)[0]))
        setCurrentVideo(res.data.streams
          .map(({ extractedId, title, upvotes, ...rest }) => ({
            id: extractedId,
            title,
            votes: upvotes.upvotes,
          }))
          .sort((a, b) => a.votes > b.votes)[0].id)
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    RefreshStreams();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Music Voting Stream
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Currently Playing</h2>
          <div className="aspect-video mb-4">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <h2 className="text-xl font-semibold mb-4">Add to Queue</h2>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="Paste YouTube link here"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Add
            </Button>
          </form>

          {videoLink && extractVideoId(videoLink) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <img
                src={`https://img.youtube.com/vi/${extractVideoId(
                  videoLink
                )}/0.jpg`}
                alt="Video thumbnail"
                className="w-full rounded-lg"
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Songs</h2>
          <div className="space-y-4">
            {queue.map((video) => (
              <Card key={video.id} className="bg-gray-800">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                      alt={video.title}
                      className="w-20 h-15 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{video.title}</h3>
                      <p className="text-sm text-gray-400">
                        Votes: {video.votes}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleVote(video.id, 1)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleVote(video.id, -1)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
