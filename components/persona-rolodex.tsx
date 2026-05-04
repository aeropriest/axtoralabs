import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Persona, personas as hardcodedPersonas } from "@/lib/personas" // Import type and hardcoded personas
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { getAllPersonas, FirestorePersona, addPersona } from "@/lib/firestore"

interface PersonaRolodexProps {
  selectedPersona: string;
  onPersonaChange: (personaId: string) => void;
}

export function PersonaRolodex({ selectedPersona, onPersonaChange }: PersonaRolodexProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // const [editingPersona, setEditingPersona] = useState<FirestorePersona | null>(null);
  const [editedPersona, setEditedPersona] = useState<FirestorePersona | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  // Local state for personas to allow editing
  const [localPersonas, setLocalPersonas] = useState<FirestorePersona[]>([]);
  
  // Function to refresh personas from Firestore with fallback to hardcoded personas
  const refreshPersonas = async () => {
    try {
      setIsFetching(true);
      console.log('Attempting to load personas from Firestore...');
      
      // Debug: Log hardcoded personas to ensure they're available
      console.log('Hardcoded personas available:', hardcodedPersonas);
      
      const firestorePersonas = await getAllPersonas();
      console.log('Firestore personas result:', firestorePersonas);
      
      // If there are no personas in Firestore yet, use hardcoded personas as fallback
      if (!firestorePersonas || firestorePersonas.length === 0) {
        console.log('No personas found in Firestore, using hardcoded personas as fallback');
        // Ensure hardcoded personas are properly cast and have all required fields
        const formattedPersonas = hardcodedPersonas.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          image: p.image || '/personas/default.png',
          prompt: p.prompt
        }));
        
        console.log('Formatted hardcoded personas:', formattedPersonas);
        setLocalPersonas(formattedPersonas as FirestorePersona[]);
        toast.info('Using default personas. Any edits will be saved to the database.');
      } else {
        console.log('Using Firestore personas:', firestorePersonas);
        setLocalPersonas(firestorePersonas);
      }
    } catch (error) {
      console.error('Error refreshing personas:', error);
      toast.error('Failed to load personas from database, using default personas.');
      
      // Fallback to hardcoded personas on error
      const formattedPersonas = hardcodedPersonas.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        image: p.image || '/personas/default.png',
        prompt: p.prompt
      }));
      
      console.log('Error fallback - using hardcoded personas:', formattedPersonas);
      setLocalPersonas(formattedPersonas as FirestorePersona[]);
    } finally {
      setIsFetching(false);
    }
  };
  
  // Initialize personas
  useEffect(() => {
    // Set hardcoded personas first to ensure we always have something to display
    const formattedPersonas = hardcodedPersonas.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image: p.image || '/personas/default.png',
      prompt: p.prompt
    }));
    
    console.log('Setting initial hardcoded personas:', formattedPersonas);
    setLocalPersonas(formattedPersonas as FirestorePersona[]);
    
    // Then try to load from Firestore
    refreshPersonas();
  }, []);

  const handleEditClick = (e: React.MouseEvent, persona: Persona) => {
    e.stopPropagation(); // Prevent card click from triggering
    // setEditingPersona(persona);
    setEditedPersona({...persona}); // Create a copy for editing
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (editedPersona) {
      setIsLoading(true);
      try {
        // Save directly to Firestore using the addPersona function
        // This will update if the persona already exists with the same ID
        await addPersona({
          id: editedPersona.id,
          name: editedPersona.name,
          description: editedPersona.description,
          image: editedPersona.image,
          prompt: editedPersona.prompt
        });

        // Update the local personas array
        const updatedPersonas = localPersonas.map(p => 
          p.id === editedPersona.id ? editedPersona : p
        );
        setLocalPersonas(updatedPersonas);
        setIsEditDialogOpen(false);
        
        // Show success toast notification
        toast.success(`${editedPersona.name} updated successfully`);
        
        console.log('Persona updated successfully:', editedPersona);
      } catch (error) {
        console.error('Error updating persona:', error);
        toast.error('Failed to update persona. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (field: keyof Persona, value: string) => {
    if (editedPersona) {
      setEditedPersona({
        ...editedPersona,
        [field]: value
      });
    }
  };

  return (
    <>
      <div className="w-full overflow-x-auto pb-4">
        {isFetching ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading personas...</span>
          </div>
        ) : localPersonas.length === 0 ? (
          <div className="text-center py-8">
            <p>No personas available. Please try refreshing.</p>
            <Button 
              onClick={refreshPersonas} 
              className="mt-4"
              variant="outline"
            >
              Refresh
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 px-2">
            {localPersonas.map((persona) => (
              <motion.div
                key={persona.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className={`w-[200px] cursor-pointer transition-all relative ${
                    selectedPersona === persona.id 
                      ? "bg-primary/10 dark:bg-primary/20" 
                      : "hover:bg-muted"
                  }`}
                  onClick={() => onPersonaChange(persona.id)}
                >
                  {/* Edit button in top right corner */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1 right-1 h-8 w-8 rounded-full opacity-70 hover:opacity-100 z-10"
                    onClick={(e) => handleEditClick(e, persona)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  
                  <CardContent className="p-4 flex flex-col items-center gap-3">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                      <Image
                        src={persona.image || '/personas/default.png'}
                        alt={persona.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{persona.name}</h3>
                      <p className="text-sm text-muted-foreground">{persona.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Persona</DialogTitle>
          </DialogHeader>
          
          {editedPersona && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  value={editedPersona.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3" 
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input 
                  id="description" 
                  value={editedPersona.description} 
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="col-span-3" 
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">Image Path</Label>
                <Input 
                  id="image" 
                  value={editedPersona.image} 
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="col-span-3" 
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="prompt" className="text-right">Prompt</Label>
                <Textarea 
                  id="prompt" 
                  value={editedPersona.prompt} 
                  onChange={(e) => handleInputChange('prompt', e.target.value)}
                  className="col-span-3 min-h-[200px]" 
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button onClick={handleSaveEdit} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
