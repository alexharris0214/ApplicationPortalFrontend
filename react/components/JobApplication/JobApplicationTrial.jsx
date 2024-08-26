import React, { useState } from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';

const JobApplicationTrial = () => {
    const [coverLetter, setCoverLetter] = useState('');
    const [resume, setResume] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Configure AWS SDK
    AWS.config.update({
        region: 'your-region', // e.g., 'us-east-1'
        accessKeyId: 'your-access-key-id',
        secretAccessKey: 'your-secret-access-key',
    });

    const s3 = new AWS.S3();

    const handleFileChange = (event) => {
        setResume(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUploading(true);

        if (!resume) {
            alert('Please upload your resume.');
            setUploading(false);
            return;
        }

        try {
            // Step 1: Generate a pre-signed URL for S3
            const params = {
                Bucket: 'your-s3-bucket-name',
                Key: `resumes/${resume.name}`, // File name
                Expires: 60, // URL expires in 60 seconds
                ContentType: resume.type,
            };

            const presignedUrl = await s3.getSignedUrlPromise('putObject', params);

            // Step 2: Upload file to S3 using the pre-signed URL
            await axios.put(presignedUrl, resume, {
                headers: {
                    'Content-Type': resume.type,
                },
            });

            const fileUrl = presignedUrl.split('?')[0]; // URL without the query string

            // Step 3: Create the request body
            const requestBody = {
                coverLetter: coverLetter,
                resumeUrl: fileUrl,
            };

            // Step 4: Console log the request body (simulating sending it to the database)
            console.log('Request Body:', requestBody);

            alert('File uploaded successfully! Check the console for the request body.');

        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload the file.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>Job Application Trial</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cover Letter:</label>
                    <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Enter your cover letter"
                        required
                    />
                </div>

                <div>
                    <label>Upload Resume:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        required
                    />
                </div>

                <button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
};

export default JobApplicationTrial;
