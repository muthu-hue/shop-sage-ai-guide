import { useState, useCallback } from 'react';
import { Upload, Camera, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const ImageAnalysis = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
    }
  };

  const analyzeImage = async () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        productName: "Apple iPhone 15 Pro",
        category: "Electronics",
        brand: "Apple",
        estimatedPrice: "$999-$1199",
        condition: "New",
        authenticity: "Verified",
        confidence: 94,
        attributes: [
          { name: "Color", value: "Natural Titanium" },
          { name: "Storage", value: "256GB" },
          { name: "Model", value: "iPhone 15 Pro" },
          { name: "Condition", value: "Excellent" }
        ]
      });
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Image Analysis
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload product images to extract detailed attributes and verify authenticity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Upload Product Image
              </CardTitle>
              <CardDescription>
                Drag and drop or click to upload an image for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded product" 
                      className="max-w-full h-48 object-contain mx-auto rounded-lg"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setUploadedImage(null);
                        setAnalysisResults(null);
                      }}
                    >
                      Upload Different Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium mb-2">Drop image here</p>
                      <p className="text-muted-foreground mb-4">or</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="hero" asChild>
                          <span>Choose File</span>
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                AI-powered product attribute extraction
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyzing ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-lg font-medium">Analyzing image...</p>
                  </div>
                  <Progress value={66} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    Extracting product attributes and verifying authenticity
                  </p>
                </div>
              ) : analysisResults ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{analysisResults.productName}</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {analysisResults.confidence}% match
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{analysisResults.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Brand</p>
                      <p className="font-medium">{analysisResults.brand}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Est. Price</p>
                      <p className="font-medium">{analysisResults.estimatedPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Authenticity</p>
                      <p className="font-medium text-green-600">{analysisResults.authenticity}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Product Attributes</h4>
                    <div className="space-y-2">
                      {analysisResults.attributes.map((attr: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-secondary rounded-lg">
                          <span className="text-sm font-medium">{attr.name}</span>
                          <span className="text-sm">{attr.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Upload an image to see analysis results
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysis;