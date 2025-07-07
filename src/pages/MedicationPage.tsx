
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: string;
  imageUrl?: string;
}

export default function MedicationPage() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [schedule, setSchedule] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const userId = auth.currentUser?.uid;

  const fetchMedications = async () => {
    if (!userId) return;
    const querySnapshot = await getDocs(collection(db, 'users', userId, 'medications'));
    const meds = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Medication));
    setMedications(meds);
  };

  useEffect(() => {
    fetchMedications();
  }, [userId]);

  const handleAddMedication = async () => {
    if (!userId || !name || !dosage || !schedule) return;
    setLoading(true);

    let imageUrl: string | undefined;
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `medications/${userId}/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, 'users', userId, 'medications'), {
      name,
      dosage,
      schedule,
      imageUrl,
    });

    setName('');
    setDosage('');
    setSchedule('');
    setImage(null);
    setLoading(false);
    fetchMedications();
  };

  const handleDeleteMedication = async (id: string) => {
    if (!userId) return;
    await deleteDoc(doc(db, 'users', userId, 'medications', id));
    fetchMedications();
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Medication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Medication Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="dosage">Dosage</Label>
            <Input id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="schedule">Schedule</Label>
            <Input id="schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="image">Photo</Label>
            <Input id="image" type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>
          <Button onClick={handleAddMedication} disabled={loading}>
            {loading ? 'Adding...' : 'Add Medication'}
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Medications</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {medications.map((med) => (
            <Card key={med.id}>
              <CardHeader>
                <CardTitle>{med.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {med.imageUrl && <img src={med.imageUrl} alt={med.name} className="w-full h-32 object-cover rounded-md mb-4" />}
                <p><strong>Dosage:</strong> {med.dosage}</p>
                <p><strong>Schedule:</strong> {med.schedule}</p>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteMedication(med.id)} className="mt-4">
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
