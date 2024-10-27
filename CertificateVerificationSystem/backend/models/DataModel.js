import mongoose from 'mongoose';

    const studentSchema = new mongoose.Schema({
        name:{
          type: String,
        },
        domain:{
          type: String,
        },
        startDate:{
          type: Date,
        },
        endDate:{
          type: Date,
        },
        certificateId:{
          type: String,
          unique: true, 
        },
      }, { timestamps: true });

export const Data = mongoose.model('Data', studentSchema);
